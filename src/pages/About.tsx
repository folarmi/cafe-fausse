import { SectionTitle } from "../components";
import Container from "../components/Container";

const About = () => {
  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="About Café Fausse"
        subtitle="Our story, our mission, and the people behind the experience."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
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
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
          <h3 className="font-serif text-xl">Founders</h3>
          <div className="mt-4 grid gap-4">
            <Founder
              name="Chef Antonio Rossi"
              bio="A culinary craftsman known for elevating classic Italian dishes with contemporary technique."
            />
            <Founder
              name="Maria Lopez"
              bio="A restaurateur focused on atmosphere, service, and building a dining experience people return to."
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

function Founder({ name, bio }: { name: string; bio: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm font-semibold">{name}</p>
      <p className="mt-1 text-sm text-neutral-700">{bio}</p>
    </div>
  );
}

export { About };
