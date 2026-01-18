import { NavLink } from "react-router-dom";
import Container from "./Container";

const linkBase = "text-sm font-medium transition hover:text-neutral-900";
const linkInactive = "text-neutral-600";
const linkActive = "text-neutral-900";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="font-serif text-lg tracking-wide">
          Café Fausse
        </NavLink>

        <nav className="flex items-center gap-4 sm:gap-6">
          {[
            ["Menu", "/menu"],
            ["Reservations", "/reservations"],
            ["About Us", "/about"],
            ["Gallery", "/gallery"],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
};

export { Navbar };
