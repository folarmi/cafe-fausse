import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <Container className="py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-serif text-lg">Café Fausse</p>
            <p className="mt-2 text-sm text-neutral-600">
              1234 Culinary Ave, Suite 100, Washington, DC 20002
            </p>
            <p className="text-sm text-neutral-600">(202) 555-4567</p>
          </div>
          <div className="text-sm text-neutral-600 sm:text-right">
            <p>Mon–Sat: 5:00 PM – 11:00 PM</p>
            <p>Sun: 5:00 PM – 9:00 PM</p>
            <p className="mt-3 text-xs">
              © {new Date().getFullYear()} Café Fausse
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
