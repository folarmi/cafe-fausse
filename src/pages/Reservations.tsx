import { useMemo, useState } from "react";
import { SectionTitle } from "../components";
import Container from "../components/Container";

type Status =
  | { type: "success"; msg: string }
  | { type: "error"; msg: string }
  | null;

type ReservationPayload = {
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone?: string;
};

const Reservations = () => {
  const [status, setStatus] = useState<Status>(null);

  const timeSlots = useMemo(
    () => ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
    [],
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(
      fd.entries(),
    ) as unknown as ReservationPayload;

    if (!payload.name?.trim()) {
      setStatus({ type: "error", msg: "Please enter your name." });
      return;
    }

    setStatus({
      type: "success",
      msg: "Reservation request captured (connect to backend next).",
    });
  };

  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="Reservations"
        subtitle="Select a time slot, number of guests, and your contact details."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-neutral-200 bg-white p-6"
        >
          <div className="grid gap-4">
            <Field label="Date">
              <input name="date" type="date" required className={inputCls} />
            </Field>

            <Field label="Time Slot">
              <select name="time" required className={inputCls}>
                <option value="">Select time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Number of Guests">
              <input
                name="guests"
                type="number"
                min={1}
                max={12}
                required
                className={inputCls}
              />
            </Field>

            <Field label="Customer Name">
              <input name="name" type="text" required className={inputCls} />
            </Field>

            <Field label="Email Address">
              <input name="email" type="email" required className={inputCls} />
            </Field>

            <Field label="Phone Number (optional)">
              <input name="phone" type="tel" className={inputCls} />
            </Field>

            <button className="mt-2 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
              Book Reservation
            </button>

            {status ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-900"
                }`}
              >
                {status.msg}
              </div>
            ) : null}
          </div>
        </form>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-100 p-6">
          <p className="font-serif text-xl">What to expect</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>
              Availability and table assignment will be handled by the backend.
            </li>
            <li>This form will later POST to an API endpoint.</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900";

export { Reservations };
