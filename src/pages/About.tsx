import Container from "../components/Container";
import { SectionTitle } from "../components";
import { Card } from "../components/ui/Card";

const About = () => {
  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="About Café Fausse"
        subtitle="Our story, our mission, and the people behind the experience."
      />

      {/* Top strip */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Founded" value="2010" />
        <Stat label="Cuisine" value="Modern Italian" />
        <Stat label="Ingredients" value="Locally sourced" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-serif text-xl">Our History</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
            Café Fausse blends traditional Italian flavors with modern culinary
            innovation.
          </p>
          <p className="mt-4 text-sm leading-6 text-neutral-700">
            We’re committed to excellent food, warm hospitality, and locally
            sourced ingredients whenever possible.
          </p>
        </Card>

        <Card className="p-6 bg-neutral-50">
          <h3 className="font-serif text-xl">Our Mission</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            To make fine dining feel warm and memorable—where every plate is
            intentional, and every guest feels looked after.
          </p>

          <div className="mt-5 grid gap-3">
            <ValuePoint title="Quality first">
              No shortcuts. Balanced flavors, careful plating, and consistent
              standards.
            </ValuePoint>
            <ValuePoint title="Hospitality with rhythm">
              Service that feels natural—timed well, attentive, never intrusive.
            </ValuePoint>
            <ValuePoint title="Seasonal mindset">
              We evolve the menu around what’s fresh, in-season, and worth
              showcasing.
            </ValuePoint>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-xl">Founders</h3>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              Leadership
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Founder
              name="Chef Antonio Rossi"
              role="Chef & Culinary Director"
              bio="A culinary craftsman known for elevating classic Italian dishes with contemporary technique."
            />
            <Founder
              name="Maria Lopez"
              role="Restaurateur & Experience Lead"
              bio="Focused on atmosphere, service, and building a dining experience people return to."
            />
          </div>
        </Card>
      </div>
    </Container>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5">
      <p className="text-xs font-semibold tracking-widest text-neutral-500">
        {label.toUpperCase()}
      </p>
      <p className="mt-1 font-serif text-2xl text-neutral-900">{value}</p>
    </div>
  );
}

function ValuePoint({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-sm text-neutral-600">{children}</p>
    </div>
  );
}

function Founder({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-neutral-900">{name}</p>
          <p className="mt-1 text-xs font-semibold tracking-widest text-neutral-500">
            {role.toUpperCase()}
          </p>
        </div>

        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-xs font-semibold text-white">
          CF
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-neutral-700">{bio}</p>
    </div>
  );
}

export { About };
