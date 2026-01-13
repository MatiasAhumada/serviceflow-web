import { CONFIG } from '@/lib/config';

export const API_ROUTES = {
  PLANS: {
    BASE: "/plans",
    BY_ID: (id: string) => `/plans/${id}`,
  },
} as const;

export const APP_ROUTES = {
  REGISTER_TRIAL: `${CONFIG.APP_URL}/register-trial`,
  LOGIN: CONFIG.APP_URL,
} as const;
