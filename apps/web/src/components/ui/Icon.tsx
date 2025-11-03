import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";

const iconVariants = cva(
  "flex items-center justify-center rounded-lg transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-[#10B981]/10 text-[#10B981]",
        success: "bg-[#22C55E]/10 text-[#22C55E]",
        destructive: "bg-[#EF4444]/10 text-[#EF4444]",
        accent: "bg-[#F59E0B]/10 text-[#F59E0B]",
        muted: "bg-muted/10 text-muted"
      },
      size: {
        sm: "w-8 h-8",
        default: "w-10 h-10",
        lg: "w-12 h-12"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

interface IconProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof iconVariants> {
  children: React.ReactNode;
}

export function Icon({ className, variant, size, children, ...props }: IconProps) {
  return (
    <div
      className={cn(iconVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  );
}