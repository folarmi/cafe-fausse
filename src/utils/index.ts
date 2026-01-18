import type { Errors, Form } from "./types";

export function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function validate(form: Form): Errors {
  const e: Errors = {};
  if (!form.date) e.date = "Please choose a date.";
  if (!form.time) e.time = "Please choose a time slot.";
  if (!form.guests) e.guests = "Please enter number of guests.";
  if (Number(form.guests) < 1 || Number(form.guests) > 12)
    e.guests = "Guests must be between 1 and 12.";
  if (!form.name.trim()) e.name = "Please enter your name.";
  if (!form.email.trim()) e.email = "Please enter an email address.";
  // basic email sanity check (browser also validates, but this helps inline)
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
    e.email = "Please enter a valid email.";
  return e;
}
