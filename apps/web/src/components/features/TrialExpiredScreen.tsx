"use client";

import { useRouter } from "next/navigation";
import { Card, Button } from "@/components/ui";
import { APP_ROUTES } from "@/constants";

export const TrialExpiredScreen = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⏰</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Tu prueba gratis ha terminado
          </h1>
          <p className="text-gray-600">
            Suscríbete ahora para continuar disfrutando de todas las
            funcionalidades
          </p>
        </div>

        <Button
          onClick={() => router.push(APP_ROUTES.SUBSCRIBE)}
          className="w-full"
        >
          Suscribirme ahora
        </Button>

        <p className="text-sm text-gray-500 mt-4">
          ¿Necesitas más tiempo? Contáctanos
        </p>
      </Card>
    </div>
  );
};
