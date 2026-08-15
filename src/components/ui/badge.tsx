import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        neutral: "border-border-hairline bg-surface-sunken text-ink-secondary",
        accent: "border-transparent bg-accent text-ink-on-accent",
        verified: "border-transparent bg-success text-white",
        outline: "border-border-strong bg-transparent text-ink-primary",
        inverted: "border-border-inverted bg-white/5 text-ink-inverted",
        danger: "border-transparent bg-danger text-white",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
