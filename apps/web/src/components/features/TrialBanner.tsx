"use client";

import { useTrial } from "@/hooks";
import type { Subscription } from "@/types";

interface TrialBannerProps {
  subscription: Subscription | null;
}

export const TrialBanner = ({ subscription }: TrialBannerProps) => {
  const { isInTrial, daysRemaining } = useTrial(subscription);

  if (!isInTrial || daysRemaining <= 0) return null;

  const message =
    daysRemaining === 1
      ? "🎉 Queda 1 día de prueba gratis"
      : `🎉 Quedan ${daysRemaining} días de prueba gratis`;

  return (
    <div className="bg-[#10B981] text-white rounded-lg p-4 m-3 shadow-lg mb-6">
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">{message}</span>
        <a 
          href="/subscribe" 
          className="text-sm bg-white text-[#10B981] px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
        >
          Ver planes
        </a>
      </div>
    </div>
  );
};
