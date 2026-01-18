import { cn } from "../../lib/cn";

type Props = {
  type: "success" | "error" | "info";
  children: React.ReactNode;
  className?: string;
};

export default function Alert({ type, children, className }: Props) {
  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : type === "error"
        ? "border-rose-200 bg-rose-50 text-rose-900"
        : "border-neutral-200 bg-neutral-50 text-neutral-900";

  return (
    <div
      className={cn("rounded-2xl border px-4 py-3 text-sm", styles, className)}
    >
      {children}
    </div>
  );
}
