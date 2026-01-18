export type Form = {
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
};

export type Errors = Partial<Record<keyof Form, string>>;
export type Status = { type: "success" | "error" | "info"; msg: string } | null;
export type Slide = { src: string; alt?: string };
export type GalleryImage = {
  src: string;
  alt: string;
};
