"use client";

import { useTrial } from "@/hooks";
import { Alert } from "@/components/ui";
import type { Subscription } from "@/types";

interface TrialBannerProps {
  subscription: Subscription | null;
}

export const TrialBanner = ({ subscription }: TrialBannerProps) => {
  const { isInTrial, daysRemaining } = useTrial(subscription);

  if (!isInTrial) return null;

  const message =
    daysRemaining === 1
      ? "Queda 1 día de prueba gratis"
      : `Quedan ${daysRemaining} días de prueba gratis`;

  return (
    <Alert variant="info" className="mb-4">
      {message}
    </Alert>
  );
};
