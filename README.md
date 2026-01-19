# Café Fausse – Web Application & Interface Design

Café Fausse is a full-stack restaurant web application developed as part of a Web Application and Interface Design project.  
The system allows users to view restaurant information, sign up for a newsletter, and make table reservations backed by a PostgreSQL database.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Python (Flask)
- PostgreSQL
- psycopg2
- Docker (for database setup)

---

## Core Features

- Restaurant menu and information pages
- Newsletter signup
- Reservation system with:
  - Persistent customer storage
  - Automatic table assignment
  - Capacity enforcement per time slot
- Server-side validation and error handling
- PostgreSQL database integration

---

## Database Design (PostgreSQL)

### Customers Table

| Field             | Description                                |
| ----------------- | ------------------------------------------ |
| customer_id       | Primary key                                |
| customer_name     | Customer name                              |
| customer_email    | Customer email (unique)                    |
| phone_number      | Phone number                               |
| newsletter_signup | Boolean indicating newsletter subscription |

### Reservations Table

| Field          | Description                         |
| -------------- | ----------------------------------- |
| reservation_id | Primary key                         |
| customer_id    | Foreign key → customers.customer_id |
| time_slot      | Reservation date and time           |
| table_number   | Assigned table number (1–30)        |

---

## Business Logic (SRS-Compliant)

- Customer information is inserted or updated in the **Customers** table.
- When a reservation is created:
  1. The selected time slot is checked.
  2. A random available table (1–30) is assigned.
  3. If all 30 tables are booked for that time slot, the request is rejected.
- The user receives a confirmation message on success or is prompted to select another time if fully booked.

---

## Running the Application

### 1. Start PostgreSQL (Docker)

Using Docker Compose:

```bash
docker-compose up -d

docker run --name cafe_fausse_db \
  -e POSTGRES_DB=cafe_fausse \
  -e POSTGRES_USER=cafe \
  -e POSTGRES_PASSWORD=cafe_password \
  -p 5432:5432 \
  -d postgres:16

2. Run the Backend (Flask)
cd backend
source .venv/bin/activate
python3 app.py

Backend runs on:

http://127.0.0.1:5000

Health check:

GET /api/health

3. Run the Frontend (React)
npm install
npm run dev

API Endpoints
Newsletter Signup
POST /api/newsletter

Request body:

{
  "email": "user@example.com"
}

Create Reservation
POST /api/reservations


Request body:

{
  "date": "YYYY-MM-DD",
  "time": "7:00 PM",
  "name": "Customer Name",
  "email": "user@example.com",
  "phone": "123456789"
}

Database Verification & Testing

The reservation system was tested by submitting 31 reservation requests for the same time slot:

The first 30 reservations were successfully created and assigned unique table numbers (1–30).

The 31st reservation was rejected with a message instructing the user to select another time slot.

Verification was performed directly in PostgreSQL using SQL queries to confirm:

Data persistence

Table capacity enforcement

Proper customer–reservation relationships

Notes

PostgreSQL is used for persistent storage as required by the project specification.

Docker simplifies database setup and execution.

All validation logic is enforced server-side.

The frontend communicates with the backend via RESTful APIs.
```
