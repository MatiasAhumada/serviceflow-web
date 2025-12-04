"use client";

import { useSession } from "next-auth/react";
import { hasPlanFeature, getPlanFeatures, type PlanFeatures, type PlanType } from "@serviceflow/shared";

export function usePlanFeatures() {
  const { data: session } = useSession();
  const planType = (session?.user?.plan as PlanType) || "vendedor";

  const features = getPlanFeatures(planType);

  const hasFeature = (feature: keyof PlanFeatures): boolean => {
    return hasPlanFeature(planType, feature);
  };

  return {
    planType,
    features,
    hasFeature,
  };
}
