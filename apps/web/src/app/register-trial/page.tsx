"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Select, Card, Alert } from "@/components/ui";
import { authApiService } from "@/services/api/auth.service";
import { PLAN_OPTIONS, APP_ROUTES } from "@/constants";
import type { RegisterTrialRequest } from "@/types";

export default function RegisterTrialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterTrialRequest>({
    email: "",
    password: "",
    name: "",
    planSlug: "vendor-basic",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApiService.registerTrial(formData);
      localStorage.setItem("token", response.access_token);
      router.push(APP_ROUTES.HOME);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Comienza tu prueba gratis</h1>
          <p className="text-gray-600 mt-2">
            5 días de acceso completo sin tarjeta
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              minLength={6}
            />
          </div>

          <div>
            <Label htmlFor="planSlug">Tipo de negocio</Label>
            <Select
              options={PLAN_OPTIONS}
              value={formData.planSlug}
              onValueChange={(value: string | number) =>
                setFormData({ ...formData, planSlug: value as string })
              }
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creando cuenta..." : "Comenzar prueba gratis"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a href={APP_ROUTES.LOGIN} className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </Card>
    </div>
  );
}
