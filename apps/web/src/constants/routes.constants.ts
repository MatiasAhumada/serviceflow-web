export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REGISTER_TRIAL: "/auth/register-trial",
  },
  CUSTOMERS: "/customers",
  PRODUCTS: "/products",
  SUPPLIERS: "/suppliers",
} as const;

export const APP_ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  DASHBOARD: "/dashboard",
  REGISTER_TRIAL: "/register-trial",
  SUBSCRIBE: "/subscribe",
} as const;
