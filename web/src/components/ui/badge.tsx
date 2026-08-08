import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        brand: "bg-brand-100 text-brand-deep",
        soft: "bg-surface-2 text-ink-700",
        ok: "bg-emerald-50 text-emerald-600",
        warn: "bg-amber-50 text-amber-600",
        danger: "bg-red-50 text-red-600",
        outline: "border border-line bg-white text-ink-500",
        dark: "bg-navy-900 text-white",
      },
    },
    defaultVariants: { variant: "soft" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
