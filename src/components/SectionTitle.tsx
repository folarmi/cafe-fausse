type Props = {
  title: string;
  subtitle?: string;
};

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-2xl sm:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">{subtitle}</p>
      ) : null}
    </div>
  );
};

export { SectionTitle };
