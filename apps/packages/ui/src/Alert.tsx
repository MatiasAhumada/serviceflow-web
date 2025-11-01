import * as React from "react";
import { cn } from "./lib/utils";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning";
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4 font-sans",
        {
          "bg-background text-foreground border-border": variant === "default",
          "border-destructive/50 text-destructive bg-destructive/5": variant === "destructive",
          "border-success/50 text-success bg-success/5": variant === "success",
          "border-accent/50 text-accent bg-accent/5": variant === "warning"
        },
        className
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight font-sans", className)}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed font-sans", className)}
      {...props}
    />
  );
}