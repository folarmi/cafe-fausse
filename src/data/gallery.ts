import type { GalleryImage } from "../utils/types";
import interior from "../assets/gallery-cafe-interior.webp";
import ribeye from "../assets/gallery-ribeye-steak.webp";
import special from "../assets/gallery-special-event.webp";
import home from "../assets/home-cafe-fausse.webp";

export const galleryImages: GalleryImage[] = [
  {
    src: home,
    alt: "Dining room ambiance",
  },
  { src: ribeye, alt: "Chef plating" },
  { src: special, alt: "Signature dish" },
  { src: interior, alt: "Wine service" },
];
