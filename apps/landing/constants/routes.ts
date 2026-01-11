export const API_ROUTES = {
  PLANS: {
    BASE: "/plans",
    BY_ID: (id: string) => `/plans/${id}`,
  },
} as const;

export const APP_ROUTES = {
  REGISTER_TRIAL: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/register-trial`
    : "http://localhost:3000/register-trial",
} as const;
