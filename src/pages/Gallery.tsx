import Lightbox from "yet-another-react-lightbox";
import { SectionTitle } from "../components";
import Container from "../components/Container";
import { galleryImages } from "../data/gallery";
import { useMemo, useState } from "react";

type Slide = { src: string; alt?: string };
const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides: Slide[] = useMemo(
    () => galleryImages.map((img) => ({ src: img.src, alt: img.alt })),
    [],
  );
  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="Gallery"
        subtitle="Ambiance, dishes, and moments—plus awards and guest reviews."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100"
                type="button"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-40 w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
          />
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="font-serif text-xl">Awards</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>• Culinary Excellence Award — 2022</li>
              <li>• Restaurant of the Year — 2023</li>
              <li>• Best Fine Dining Experience — Foodie Magazine, 2023</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="font-serif text-xl">Reviews</p>
            <div className="mt-3 space-y-3 text-sm text-neutral-700">
              <p className="rounded-2xl bg-neutral-50 p-4">
                “Exceptional ambiance and unforgettable flavors.” — Gourmet
                Review
              </p>
              <p className="rounded-2xl bg-neutral-50 p-4">
                “A must-visit restaurant for food enthusiasts.” — The Daily Bite
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
};

export { Gallery };
