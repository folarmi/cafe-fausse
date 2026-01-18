import { useState } from "react";
import { SectionTitle } from "../components";
import Container from "../components/Container";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import type { Status } from "../utils/types";

const Home = () => {
  return (
    <div>
      <Hero />
      <Highlights />
      <Newsletter />
    </div>
  );
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* background gradient / “hero image feel” without needing real images */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-50 via-white to-neutral-50" />
      <div className="absolute -top-24  -right-30 h-72 w-72 rounded-full bg-neutral-900/5 blur-2xl" />
      <div className="absolute -bottom-24  -left-30  h-72 w-72 rounded-full bg-neutral-900/5 blur-2xl" />

      <Container className="relative py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-neutral-500">
              FINE DINING • ITALIAN INSPIRED
            </p>

            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Café Fausse
            </h1>

            <p className="mt-4 max-w-xl text-neutral-600">
              Traditional Italian flavors, modern presentation, and a dining
              room that feels like an occasion—every night.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/reservations">
                <Button>Book a Table</Button>
              </a>
              <a href="/menu">
                <Button variant="secondary">View Menu</Button>
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-neutral-700">
              <div>
                <span className="font-semibold">Address:</span> 1234 Culinary
                Ave, Suite 100, Washington, DC 20002
              </div>
              <div>
                <span className="font-semibold">Phone:</span> (202) 555-4567
              </div>
              <div>
                <span className="font-semibold">Hours:</span> Mon–Sat
                5:00PM–11:00PM • Sun 5:00PM–9:00PM
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
              <div className="aspect-[4/3] w-full" />
              <div className="absolute inset-0 grid place-items-center text-sm text-neutral-500">
                Hero image placeholder
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {["Seasonal", "Handmade", "Curated"].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-center text-xs font-semibold text-neutral-800"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Highlights() {
  const items = [
    {
      title: "Signature Menu",
      desc: "Starters to espresso—balanced and intentional.",
    },
    {
      title: "Warm Atmosphere",
      desc: "A dining room built for dates and celebrations.",
    },
    {
      title: "Thoughtful Service",
      desc: "From seating to dessert pacing, we keep it smooth.",
    },
  ];

  return (
    <section>
      <Container className="py-12">
        <SectionTitle
          title="Why guests come back"
          subtitle="A fine-dining experience with the comfort of a favorite spot."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} className="p-6">
              <p className="font-serif text-xl">{it.title}</p>
              <p className="mt-2 text-sm text-neutral-600">{it.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Newsletter() {
  const [status, setStatus] = useState<Status>(null);
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", msg: "Please enter an email address." });
      return;
    }
    // backend later
    setStatus({
      type: "success",
      msg: "You’re signed up (connect this to backend next).",
    });
    setEmail("");
  };

  return (
    <section>
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle
              title="Newsletter"
              subtitle="Get seasonal menu updates and special event announcements."
            />
            <p className="text-sm text-neutral-600">
              No spam. Just occasional updates worth opening.
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={onSubmit} className="grid gap-3">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Email</span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </label>

              <Button type="submit">Sign Up</Button>

              {status ? <Alert type={status.type}>{status.msg}</Alert> : null}
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export { Home };
