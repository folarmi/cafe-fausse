/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { SectionTitle } from "../components";
import Container from "../components/Container";
import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { todayISO, validate } from "../utils";
import type { Errors, Form } from "../utils/types";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { createReservation } from "../lib/api";

const Reservations = () => {
  const [form, setForm] = useState<Form>({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    msg: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const timeSlots = useMemo(
    () => ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
    [],
  );

  const set = <K extends keyof Form>(key: K, val: Form[K]) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
    setStatus(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const e2 = validate(form);
    setErrors(e2);

    if (Object.keys(e2).length > 0) {
      setStatus({ type: "error", msg: "Please fix the highlighted fields." });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const res = await createReservation({
        date: form.date,
        time: form.time,
        guests: form.guests,
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
      });

      setStatus({ type: "success", msg: res.message });
      setForm((p) => ({ ...p, time: "" }));
    } catch (err: any) {
      // backend can return field errors
      if (err?.errors) setErrors((prev: any) => ({ ...prev, ...err.errors }));

      setStatus({
        type: "error",
        msg: err?.message || "Reservation failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="Reservations"
        subtitle="Choose a date, time slot, and guest count. We’ll handle availability when backend is connected."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date" error={errors.date}>
                <Input
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  hasError={!!errors.date}
                  aria-invalid={!!errors.date}
                />
              </Field>

              <Field label="Time Slot" error={errors.time}>
                <Select
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  hasError={!!errors.time}
                  aria-invalid={!!errors.time}
                >
                  <option value="">Select time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Number of Guests" error={errors.guests}>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={form.guests}
                  onChange={(e) => set("guests", e.target.value)}
                  hasError={!!errors.guests}
                  aria-invalid={!!errors.guests}
                />
              </Field>

              <div className="hidden sm:block" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Customer Name" error={errors.name}>
                <Input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  hasError={!!errors.name}
                  aria-invalid={!!errors.name}
                />
              </Field>

              <Field label="Email Address" error={errors.email}>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  hasError={!!errors.email}
                  aria-invalid={!!errors.email}
                />
              </Field>
            </div>

            <Field label="Phone Number (optional)" error={errors.phone}>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+234..."
                hasError={!!errors.phone}
                aria-invalid={!!errors.phone}
              />
            </Field>

            <div className="pt-2">
              <Button type="submit" isLoading={loading}>
                Book Reservation
              </Button>
            </div>

            {status ? <Alert type={status.type}>{status.msg}</Alert> : null}
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 bg-neutral-50">
            <p className="font-serif text-xl">Dining Notes</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>
                Reservations are held for 15 minutes after the scheduled time.
              </li>
              <li>For parties above 8, we recommend calling ahead.</li>
              <li>Backend will confirm availability and assign tables.</li>
            </ul>
          </Card>

          <Card className="p-6">
            <p className="font-serif text-xl">Contact</p>
            <p className="mt-2 text-sm text-neutral-600">
              Questions or special requests?
            </p>
            <p className="mt-3 text-sm font-semibold text-neutral-900">
              (202) 555-4567
            </p>
          </Card>
        </div>
      </div>
    </Container>
  );
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

export { Reservations };
