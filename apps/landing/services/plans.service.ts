import clientAxios from "@/lib/axios";
import { API_ROUTES } from "@/constants/routes";

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  baseUserSeats: number;
  features: Record<string, unknown>;
  popular: boolean;
  featureList: string[];
}

export const plansService = {
  getAll: async (): Promise<Plan[]> => {
    const { data } = await clientAxios.get<Plan[]>(API_ROUTES.PLANS.BASE);
    return data;
  },

  getById: async (id: string): Promise<Plan> => {
    const { data } = await clientAxios.get<Plan>(API_ROUTES.PLANS.BY_ID(id));
    return data;
  },
};
