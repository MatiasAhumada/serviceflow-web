import * as React from "react";
import { cn } from "./lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2": variant === "default",
          "border border-border bg-background hover:bg-secondary/10 hover:text-secondary h-10 px-4 py-2": variant === "outline"
        },
        className
      )}
      {...props}
    />
  );
}
