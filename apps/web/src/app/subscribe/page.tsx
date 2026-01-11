"use client";

import { Card, Button } from "@/components/ui";

const PAYMENT_METHODS = [
  {
    id: "mercadopago",
    name: "Mercado Pago",
    description: "Tarjeta de crédito o débito",
  },
  {
    id: "transfer",
    name: "Transferencia Bancaria",
    description: "Aprobación manual en 24-48hs",
  },
  {
    id: "cash",
    name: "Efectivo en Tucumán",
    description: "Pago presencial",
  },
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Tu prueba gratis ha terminado</h1>
          <p className="text-gray-600 mt-2">
            Suscríbete ahora para continuar usando ServiceFlow
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Elige tu método de pago</h2>

          {PAYMENT_METHODS.map((method) => (
            <Card
              key={method.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <Button>Seleccionar</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-sm text-gray-700">
            Contáctanos por WhatsApp o email para asistencia con tu suscripción
          </p>
        </div>
      </Card>
    </div>
  );
}
