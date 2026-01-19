const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:5000";

export type ApiError = {
  ok: false;
  message?: string;
  errors?: Record<string, string>;
};

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok || data?.ok === false) {
    throw data as ApiError;
  }

  return data as T;
}

export function subscribeNewsletter(email: string) {
  return postJSON<{ ok: true; message: string }>("/api/newsletter", { email });
}

export function createReservation(payload: {
  date: string;
  time: string;
  guests: number | string;
  name: string;
  email: string;
  phone?: string;
}) {
  return postJSON<{
    ok: true;
    message: string;
    reservation: unknown;
  }>("/api/reservations", payload);
}
