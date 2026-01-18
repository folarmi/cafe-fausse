import { SectionTitle } from "../components";
import Container from "../components/Container";
import { fmt, menu } from "../data/menu";

const Menu = () => {
  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="Menu"
        subtitle="Explore starters, mains, desserts, and beverages."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {menu.map((section) => (
          <div
            key={section.category}
            className="rounded-3xl border border-neutral-200 bg-white p-6"
          >
            <h3 className="font-serif text-xl">{section.category}</h3>
            <div className="mt-4 space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                  </div>
                  <p className="text-sm font-semibold">{fmt(item.price)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export { Menu };
