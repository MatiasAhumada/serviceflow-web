import * as React from "react";
import { cn } from "./lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground font-sans"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-lg border-2 border-[#E2E8F0] bg-white px-4 py-3 text-sm font-medium text-[#111827] transition-all duration-200",
            "placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10",
            "hover:border-[#2563EB]/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC]",
            "dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F8FAFC] dark:focus:border-[#2563EB]",
            error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/10",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-sans">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";