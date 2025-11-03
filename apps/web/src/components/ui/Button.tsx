import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 hover:shadow-md focus-visible:ring-primary",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white hover:shadow-md focus-visible:ring-primary",
        secondary: "bg-secondary text-white hover:bg-secondary/90 hover:shadow-md focus-visible:ring-secondary",
        ghost: "hover:bg-primary/10 hover:text-primary focus-visible:ring-primary",
        destructive: "bg-destructive text-white hover:bg-destructive/90 hover:shadow-md focus-visible:ring-destructive"
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2",
        lg: "h-12 px-8 py-3",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}