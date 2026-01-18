import { SectionTitle } from "../components";
import Container from "../components/Container";

const Home = () => {
  return (
    <div>
      <section className="bg-white">
        <Container className="py-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-widest text-neutral-500">
                FINE DINING • ITALIAN INSPIRED
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Café Fausse
              </h1>

              <p className="mt-4 max-w-xl text-neutral-600">
                A modern take on traditional Italian flavors—crafted for an
                unforgettable evening.
              </p>

              <div className="mt-6 grid gap-3 text-sm text-neutral-700">
                <div>
                  <span className="font-medium">Address:</span> 1234 Culinary
                  Ave, Suite 100, Washington, DC 20002
                </div>
                <div>
                  <span className="font-medium">Phone:</span> (202) 555-4567
                </div>
                <div>
                  <span className="font-medium">Hours:</span> Mon–Sat
                  5:00PM–11:00PM • Sun 5:00PM–9:00PM
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/reservations"
                  className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Book a Table
                </a>
                <a
                  href="/menu"
                  className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  View Menu
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
              <div className="aspect-[4/3] w-full" />
              <div className="absolute inset-0 grid place-items-center text-sm text-neutral-500">
                Hero image placeholder
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12">
          <SectionTitle
            title="Newsletter"
            subtitle="Get seasonal menu updates and special event announcements."
          />
          <NewsletterForm />
        </Container>
      </section>
    </div>
  );
};

function NewsletterForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Saved for later: connect to backend endpoint");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
      />
      <button className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
        Sign Up
      </button>
    </form>
  );
}

export { Home };
