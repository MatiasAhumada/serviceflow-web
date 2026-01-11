"use client";

import { cn } from "@/lib/utils";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}
