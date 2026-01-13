import { clientAxios } from "@/lib/axios";
import { getSession } from "next-auth/react";
import type { Subscription } from "@/types";

export const subscriptionService = {
  async getCurrent(): Promise<Subscription> {
    const session = await getSession();
    const response = await clientAxios.get<Subscription>(
      "/subscriptions/me",
      {
        headers: {
          Authorization: session?.user?.accessToken ? `Bearer ${session.user.accessToken}` : '',
        },
      },
    );
    return response.data;
  },
};
