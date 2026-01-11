import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariants = cva(
  "flex items-center justify-center rounded-lg transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary dark:bg-primary/20",
        secondary:
          "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
        success:
          "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
        destructive:
          "bg-destructive/10 text-destructive dark:bg-destructive/20",
        accent:
          "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
        muted: "bg-muted/50 text-muted-foreground",
      },
      size: {
        sm: "w-8 h-8",
        default: "w-10 h-10",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface IconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  children: React.ReactNode;
}

export function Icon({
  className,
  variant,
  size,
  children,
  ...props
}: IconProps) {
  return (
    <div className={cn(iconVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
}
