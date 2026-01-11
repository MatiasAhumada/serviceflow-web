import { useMemo } from "react";
import type { Subscription } from "@/types";
import { SUBSCRIPTION_STATUS } from "@/constants";

interface TrialInfo {
  isInTrial: boolean;
  daysRemaining: number;
  isExpired: boolean;
  subscription: Subscription | null;
}

export const useTrial = (subscription: Subscription | null): TrialInfo => {
  return useMemo(() => {
    if (!subscription) {
      return {
        isInTrial: false,
        daysRemaining: 0,
        isExpired: false,
        subscription: null,
      };
    }

    const isInTrial =
      subscription.isTrial && subscription.status === SUBSCRIPTION_STATUS.TRIAL;

    if (!isInTrial || !subscription.trialEndDate) {
      return {
        isInTrial: false,
        daysRemaining: 0,
        isExpired: false,
        subscription,
      };
    }

    const now = new Date();
    const endDate = new Date(subscription.trialEndDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      isInTrial: true,
      daysRemaining: Math.max(0, diffDays),
      isExpired: diffDays <= 0,
      subscription,
    };
  }, [subscription]);
};
