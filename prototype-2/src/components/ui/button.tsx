"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-brand text-white shadow-[0_8px_20px_rgba(255,88,0,0.28)] hover:bg-brand-hover active:scale-[0.98]",
        dark: "rounded-full bg-ink-950 text-white hover:bg-black active:scale-[0.98]",
        outline:
          "rounded-full border border-line bg-white text-ink-950 hover:border-brand hover:text-brand active:scale-[0.98]",
        ghost: "rounded-full text-ink-700 hover:bg-surface hover:text-ink-950",
        white: "rounded-full bg-white text-ink-950 shadow-lg hover:bg-surface active:scale-[0.98]",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[15px]",
        lg: "h-14 px-9 text-base",
        xl: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
