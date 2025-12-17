export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
  },
  CUSTOMERS: "/customers",
} as const;

export const APP_ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  DASHBOARD: "/dashboard",
} as const;