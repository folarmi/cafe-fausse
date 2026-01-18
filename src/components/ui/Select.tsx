import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean };

export default function Select({ className, hasError, ...props }: Props) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition",
        hasError
          ? "border-rose-300 focus:border-rose-500"
          : "border-neutral-300 focus:border-neutral-900",
        className,
      )}
      {...props}
    />
  );
}
