import type { SelectOption } from "@/components/ui";

export const PLAN_OPTIONS: SelectOption[] = [
  { value: "vendor-basic", label: "Vendedor - Plan Básico" },
  { value: "technician-basic", label: "Taller - Plan Básico" },
  { value: "company-standard", label: "Empresa - Plan Estándar" },
];

export const TRIAL_DURATION_DAYS = 5;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
} as const;
