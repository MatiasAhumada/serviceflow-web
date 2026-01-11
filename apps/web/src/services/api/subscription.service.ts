import { clientAxios } from "@/lib/axios";
import type { Subscription } from "@/types";

export const subscriptionService = {
  async getCurrent(): Promise<Subscription> {
    const response = await clientAxios.get<Subscription>(
      "/subscriptions/current",
    );
    return response.data;
  },
};
