import { SectionTitle } from "../components";
import Container from "../components/Container";
import { Card } from "../components/ui/Card";
import { fmt, menu } from "../data/menu";

const Menu = () => {
  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="Menu"
        subtitle="Explore starters, mains, desserts, and beverages."
      />

      {/* Small “premium” strip */}
      <Card className="mb-8 overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-neutral-500">
              CHEF’S PICKS
            </p>
            <p className="mt-1 font-serif text-xl text-neutral-900">
              Grilled Salmon • Ribeye Steak • Tiramisu
            </p>
          </div>
          <div className="inline-flex items-center self-start rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 sm:self-auto">
            Seasonal updates weekly
          </div>
        </div>

        <div className="p-6 text-sm text-neutral-600">
          Crafted with classic Italian roots and modern technique. Ask your
          server about tonight’s specials.
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {menu.map((section) => (
          <Card key={section.category} className="p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-xl">{section.category}</h3>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                {section.items.length} items
              </span>
            </div>

            <div className="mt-5 divide-y divide-neutral-200">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-900">
                    {fmt(item.price)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Small note section */}
      <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-semibold text-neutral-900">Dietary notes</p>
        <p className="mt-2 text-sm text-neutral-600">
          Please inform your server of any allergies. Vegetarian options are
          available, and we can accommodate most preferences with notice.
        </p>
      </div>
    </Container>
  );
};

export { Menu };
