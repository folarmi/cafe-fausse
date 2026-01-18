import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean };

export default function Input({ className, hasError, ...props }: Props) {
  return (
    <input
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
