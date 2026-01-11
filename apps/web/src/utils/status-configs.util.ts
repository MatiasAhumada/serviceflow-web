/**
 * Configuraciones de estados centralizadas
 */

export const STATUS_CONFIGS = {
  service: {
    received: {
      label: "Recibido",
      variant: "default" as const,
      color: "bg-blue-500",
    },
    in_progress: {
      label: "En Progreso",
      variant: "default" as const,
      color: "bg-yellow-500",
    },
    completed: {
      label: "Completado",
      variant: "success" as const,
      color: "bg-green-500",
    },
    delivered: {
      label: "Entregado",
      variant: "success" as const,
      color: "bg-emerald-500",
    },
    cancelled: {
      label: "Cancelado",
      variant: "destructive" as const,
      color: "bg-red-500",
    },
  },
  sale: {
    pending: {
      label: "Pendiente",
      variant: "default" as const,
      color: "bg-yellow-500",
    },
    completed: {
      label: "Completada",
      variant: "success" as const,
      color: "bg-green-500",
    },
    cancelled: {
      label: "Cancelada",
      variant: "destructive" as const,
      color: "bg-red-500",
    },
  },
  user: {
    active: {
      label: "Activo",
      variant: "success" as const,
      color: "bg-green-500",
    },
    inactive: {
      label: "Inactivo",
      variant: "destructive" as const,
      color: "bg-red-500",
    },
    suspended: {
      label: "Suspendido",
      variant: "destructive" as const,
      color: "bg-orange-500",
    },
  },
  cashRegister: {
    open: {
      label: "Abierta",
      variant: "success" as const,
      color: "bg-green-500",
    },
    closed: {
      label: "Cerrada",
      variant: "destructive" as const,
      color: "bg-red-500",
    },
  },
} as const;

export type StatusType = keyof typeof STATUS_CONFIGS;
export type StatusValue<T extends StatusType> =
  keyof (typeof STATUS_CONFIGS)[T];
