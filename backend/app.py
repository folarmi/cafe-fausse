# backend/app.py
import os
import re
import random
from datetime import datetime
from typing import Optional

from flask import Flask, request, jsonify
from flask_cors import CORS

import psycopg
from psycopg.rows import dict_row

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

EMAIL_RE = re.compile(r"^\S+@\S+\.\S+$")
TOTAL_TABLES = 30

# Maps your frontend dropdown labels to 24h time for "time_slot"
SLOT_TO_24H = {
    "5:00 PM": "17:00",
    "6:00 PM": "18:00",
    "7:00 PM": "19:00",
    "8:00 PM": "20:00",
    "9:00 PM": "21:00",
}

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://cafe:cafe_password@localhost:5432/cafe_fausse",
)


def get_conn():
    # dict_row makes fetchone()/fetchall() return dict-like rows
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


def init_db():
    # psycopg v3 will auto-commit on successful context exit
    with get_conn() as conn:
        with conn.cursor() as cur:
            # Customers table (as specified)
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS customers (
                    customer_id SERIAL PRIMARY KEY,
                    customer_name TEXT NOT NULL,
                    customer_email TEXT NOT NULL UNIQUE,
                    phone_number TEXT,
                    newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE
                );
                """
            )

            # Reservations table (as specified)
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS reservations (
                    reservation_id SERIAL PRIMARY KEY,
                    customer_id INT NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
                    time_slot TIMESTAMPTZ NOT NULL,
                    table_number INT NOT NULL CHECK (table_number >= 1 AND table_number <= 30)
                );
                """
            )

            # Prevent double-booking the same table for the same time_slot
            cur.execute(
                """
                CREATE UNIQUE INDEX IF NOT EXISTS uniq_slot_table
                ON reservations(time_slot, table_number);
                """
            )


# Initialize DB on startup
init_db()


def parse_time_slot(date_str: str, time_label: str) -> datetime:
    """
    Takes:
      date_str: YYYY-MM-DD
      time_label: "5:00 PM"
    Returns datetime.
    """
    if time_label not in SLOT_TO_24H:
        raise ValueError("Invalid time slot")

    # e.g. "2026-01-20 19:00"
    dt_str = f"{date_str} {SLOT_TO_24H[time_label]}"
    return datetime.strptime(dt_str, "%Y-%m-%d %H:%M")


def upsert_customer(
    conn,
    name: str,
    email: str,
    phone: Optional[str],
    newsletter_signup: bool,
):
    """
    Insert customer if new; if existing, update name/phone and keep newsletter true if ever true.
    Returns customer row (dict).
    """
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO customers (customer_name, customer_email, phone_number, newsletter_signup)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (customer_email)
            DO UPDATE SET
                customer_name = EXCLUDED.customer_name,
                phone_number = EXCLUDED.phone_number,
                newsletter_signup = (customers.newsletter_signup OR EXCLUDED.newsletter_signup)
            RETURNING customer_id, customer_name, customer_email, phone_number, newsletter_signup;
            """,
            (name, email, phone, newsletter_signup),
        )
        return cur.fetchone()


def pick_random_available_table(conn, time_slot: datetime) -> Optional[int]:
    """
    Returns a random available table_number [1..30] for the time_slot.
    None if fully booked.
    """
    with conn.cursor() as cur:
        cur.execute(
            "SELECT table_number FROM reservations WHERE time_slot = %s;",
            (time_slot,),
        )
        taken = {row["table_number"] for row in cur.fetchall()}

    available = [t for t in range(1, TOTAL_TABLES + 1) if t not in taken]
    if not available:
        return None

    return random.choice(available)


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "service": "cafe-fausse-api", "db": "postgres"})


@app.post("/api/newsletter")
def newsletter():
    """
    Newsletter signup toggles Customers.newsletter_signup = true
    Minimal required fields are email; name/phone are optional.
    """
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    name = (data.get("name") or "Guest").strip() or "Guest"
    phone = (data.get("phone") or "").strip() or None

    if not email:
        return jsonify({"ok": False, "message": "Email is required."}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"ok": False, "message": "Please enter a valid email."}), 400

    with get_conn() as conn:
        upsert_customer(conn, name=name, email=email, phone=phone, newsletter_signup=True)

    return jsonify({"ok": True, "message": "Subscribed successfully."}), 201


@app.post("/api/reservations")
def create_reservation():
    """
    Takes customer info, adds to Customers table, then assigns a random table for the chosen time_slot.
    If all 30 tables are taken for that time slot, ask user to pick another time.
    """
    data = request.get_json(silent=True) or {}
    errors = {}

    date_str = (data.get("date") or "").strip()  # YYYY-MM-DD
    time_label = (data.get("time") or "").strip()  # "7:00 PM"
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    phone = (data.get("phone") or "").strip() or None

    if not date_str:
        errors["date"] = "Date is required."
    else:
        try:
            datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            errors["date"] = "Date must be YYYY-MM-DD."

    if not time_label:
        errors["time"] = "Time slot is required."
    elif time_label not in SLOT_TO_24H:
        errors["time"] = "Invalid time slot."

    if not name:
        errors["name"] = "Customer name is required."

    if not email:
        errors["email"] = "Customer email is required."
    elif not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email."

    if errors:
        return jsonify({"ok": False, "message": "Validation failed.", "errors": errors}), 400

    # Combine date + time into one "time_slot"
    try:
        time_slot = parse_time_slot(date_str, time_label)
    except ValueError:
        return (
            jsonify(
                {
                    "ok": False,
                    "message": "Invalid time slot.",
                    "errors": {"time": "Invalid time slot."},
                }
            ),
            400,
        )

    with get_conn() as conn:
        # 1) Add/update customer row
        customer = upsert_customer(
            conn, name=name, email=email, phone=phone, newsletter_signup=False
        )

        # 2) Assign random available table for that time_slot
        table_number = pick_random_available_table(conn, time_slot=time_slot)
        if table_number is None:
            return (
                jsonify(
                    {
                        "ok": False,
                        "message": "All tables are taken for that time slot. Please pick another time.",
                        "errors": {"time": "Fully booked."},
                    }
                ),
                409,
            )

        # 3) Insert reservation (retry on rare race condition)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO reservations (customer_id, time_slot, table_number)
                    VALUES (%s, %s, %s)
                    RETURNING reservation_id, customer_id, time_slot, table_number;
                    """,
                    (customer["customer_id"], time_slot, table_number),
                )
                reservation = cur.fetchone()

        except psycopg.errors.UniqueViolation:
            # Another request took that table number; try once more
            table_number_retry = pick_random_available_table(conn, time_slot=time_slot)
            if table_number_retry is None:
                return (
                    jsonify(
                        {
                            "ok": False,
                            "message": "All tables are taken for that time slot. Please pick another time.",
                            "errors": {"time": "Fully booked."},
                        }
                    ),
                    409,
                )

            with conn.cursor() as cur2:
                cur2.execute(
                    """
                    INSERT INTO reservations (customer_id, time_slot, table_number)
                    VALUES (%s, %s, %s)
                    RETURNING reservation_id, customer_id, time_slot, table_number;
                    """,
                    (customer["customer_id"], time_slot, table_number_retry),
                )
                reservation = cur2.fetchone()

        # 4) Confirm successful reservation (include table number)
        return (
            jsonify(
                {
                    "ok": True,
                    "message": f"Reservation successful. Your table number is {reservation['table_number']}.",
                    "reservation": reservation,
                }
            ),
            201,
        )


if __name__ == "__main__":
    # Local dev only; Render will still run `python app.py` unless you switch to gunicorn
    app.run(host="127.0.0.1", port=5000, debug=True)
