import * as React from "react";
import { cn } from "./lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Progress({ 
  className, 
  value, 
  max = 100, 
  showLabel = false,
  size = "md",
  ...props 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-sm font-sans text-muted mb-1">
          <span>Progreso</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          {
            "h-1": size === "sm",
            "h-2": size === "md", 
            "h-3": size === "lg"
          }
        )}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}