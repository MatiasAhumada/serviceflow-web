"use client";

import { useSession } from "next-auth/react";
import {
  hasRoleFeature,
  getRoleFeatures,
  type RoleFeatures,
  type UserRole,
} from "@/lib/plan-features";

export function usePlanFeatures() {
  const { data: session } = useSession();
  const userRole = (session?.user?.userType?.code as UserRole) || "vendedor";
  const isCompanyPlan = session?.user?.company !== null;

  const features = getRoleFeatures(userRole);

  const hasFeature = (feature: keyof RoleFeatures): boolean => {
    // Si es plan individual (sin compañía), solo ve lo básico de su rol
    if (!isCompanyPlan) {
      if (userRole === "vendedor") {
        return ["products", "sales", "stock", "cashRegister"].includes(feature);
      }
      if (userRole === "tecnico") {
        return ["workOrders", "repairs"].includes(feature);
      }
    }
    // Si es plan compañía, ve según su rol
    return hasRoleFeature(userRole, feature);
  };

  return {
    userRole,
    isCompanyPlan,
    features,
    hasFeature,
  };
}
