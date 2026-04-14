import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./badge.module.css";

const badgeVariants = cva(styles.base, {
  variants: {
    variant: {
      default: styles.default,
      secondary: styles.secondary,
      destructive: styles.destructive,
      outline: styles.outline,
      success: styles.success,
      warning: styles.warning,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
