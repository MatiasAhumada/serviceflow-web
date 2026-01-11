import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "@/services/api/subscription.service";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: () => subscriptionService.getCurrent(),
    staleTime: 1000 * 60 * 5,
  });
};
