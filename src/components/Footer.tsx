import { NavLink } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg text-neutral-900">Café Fausse</p>
            <p className="mt-3 text-sm text-neutral-600">
              1234 Culinary Ave, Suite 100, Washington, DC 20002
            </p>
            <p className="mt-1 text-sm text-neutral-600">(202) 555-4567</p>

            <p className="mt-4 text-sm text-neutral-600">
              Fine dining, made warm.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-semibold text-neutral-900">Explore</p>
            <div className="mt-3 grid gap-2">
              <FooterLink to="/menu">Menu</FooterLink>
              <FooterLink to="/reservations">Reservations</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/gallery">Gallery</FooterLink>
            </div>
          </div>

          {/* Hours */}
          <div className="lg:text-right">
            <p className="text-sm font-semibold text-neutral-900">Hours</p>
            <div className="mt-3 space-y-1 text-sm text-neutral-600">
              <p>Mon–Sat: 5:00 PM – 11:00 PM</p>
              <p>Sun: 5:00 PM – 9:00 PM</p>
            </div>

            <p className="mt-4 text-sm text-neutral-600">
              Want updates? Sign up for our newsletter on the home page.
            </p>

            <p className="mt-6 text-xs text-neutral-500">
              © {new Date().getFullYear()} Café Fausse
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className="text-sm text-neutral-600 hover:text-neutral-900 transition"
    >
      {children}
    </NavLink>
  );
}

export { Footer };
