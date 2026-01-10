export const API_ROUTES = {
  PLANS: {
    BASE: "/plans",
    BY_ID: (id: string) => `/plans/${id}`,
  },
} as const;
