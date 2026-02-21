import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { SectionTitle } from "../components";
import Container from "../components/Container";
import { galleryImages } from "../data/gallery";
import { useMemo, useState } from "react";
import { Card } from "../components/ui/Card";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides: Slide[] = useMemo(
    () =>
      galleryImages.map((img) => ({
        src: img.src,
        alt: img.alt,
        // captions plugin uses "title" / "description"
        title: img.alt,
      })),
    [],
  );

  return (
    <Container className="py-10 sm:py-12">
      <SectionTitle
        title="Gallery"
        subtitle="A look inside our dining room, kitchen, and signature plates."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100"
                aria-label={`Open image: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-44 w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            // keeps index in sync when user navigates
            on={{
              view: ({ index: currentIndex }) => setIndex(currentIndex),
            }}
            plugins={[Captions, Counter, Fullscreen, Thumbnails, Zoom]}
            captions={{ showToggle: true, descriptionTextAlign: "center" }}
            carousel={{ finite: false }}
            controller={{ closeOnBackdropClick: true }}
          />
        </div>

        <aside className="space-y-4">
          <Card className="p-6">
            <p className="font-serif text-xl">Awards</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>• Culinary Excellence Award — 2022</li>
              <li>• Restaurant of the Year — 2023</li>
              <li>• Best Fine Dining Experience — Foodie Magazine, 2023</li>
            </ul>
          </Card>

          <Card className="bg-neutral-50 p-6">
            <p className="font-serif text-xl">Guest Reviews</p>
            <div className="mt-3 space-y-3 text-sm text-neutral-700">
              <p className="rounded-2xl border border-neutral-200 bg-white p-4">
                “Exceptional ambiance and unforgettable flavors.” — Gourmet
                Review
              </p>
              <p className="rounded-2xl border border-neutral-200 bg-white p-4">
                “A must-visit restaurant for food enthusiasts.” — The Daily Bite
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </Container>
  );
};

export { Gallery };
