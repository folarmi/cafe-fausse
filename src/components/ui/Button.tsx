import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900/20",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        size === "md"
          ? "h-11 px-5 rounded-2xl text-sm"
          : "h-9 px-4 rounded-xl text-sm",
        variant === "primary" &&
          "bg-neutral-900 text-white hover:bg-neutral-800",
        variant === "secondary" &&
          "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
        variant === "ghost" &&
          "bg-transparent text-neutral-700 hover:bg-neutral-100",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
      ) : null}
      {children}
    </button>
  );
}
