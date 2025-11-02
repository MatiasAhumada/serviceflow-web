import * as React from "react";
import { cn } from "./lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
        {
          "bg-primary text-white hover:bg-primary/90 hover:shadow-md focus-visible:ring-primary h-11 px-6 py-2.5": variant === "default",
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white hover:shadow-md focus-visible:ring-primary h-11 px-6 py-2.5": variant === "outline"
        },
        className
      )}
      {...props}
    />
  );
}