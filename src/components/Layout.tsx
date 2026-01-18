import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
