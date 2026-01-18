import { NavLink } from "react-router-dom";
import Container from "./Container";
import { useState } from "react";
import Button from "./ui/Button";
import { cn } from "../lib/cn";

const links = [
  { label: "Menu", to: "/menu" },
  { label: "Reservations", to: "/reservations" },
  { label: "About Us", to: "/about" },
  { label: "Gallery", to: "/gallery" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="font-serif text-lg tracking-wide">
          Café Fausse
        </NavLink>

        <nav className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition",
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="sm:hidden">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </Button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-neutral-200 bg-white sm:hidden"
        >
          <Container className="py-3">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-2xl px-3 py-2 text-sm font-semibold transition",
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-50",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
};

export { Navbar };
