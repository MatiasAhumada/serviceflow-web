"use client";

import { cn } from "@/lib/utils";

export function SpotlightBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#10B981] opacity-20 blur-[120px] animate-pulse" />
      <div className="absolute top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#2563EB] opacity-20 blur-[120px] animate-pulse delay-1000" />
      <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-[#10B981] opacity-10 blur-[100px]" />
    </div>
  );
}
