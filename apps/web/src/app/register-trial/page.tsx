'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button, Input, Label, Select, Card } from '@/components/ui';
import { authApiService } from '@/services/api/auth.service';
import { PLAN_OPTIONS, APP_ROUTES } from '@/constants';
import { ClientHandler } from '@/lib/client-handler';
import type { RegisterTrialRequest } from '@/types';
import logoLogin from '../../../public/assets/logo-principal.png';

export default function RegisterTrialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterTrialRequest>({
    email: "",
    password: "",
    name: "",
    planSlug: "vendor-basic",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApiService.registerTrial(formData);
      
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        ClientHandler.error({
          title: 'Error al iniciar sesión',
          description: 'Por favor, intenta iniciar sesión manualmente.',
        });
        setTimeout(() => {
          router.push(APP_ROUTES.LOGIN);
        }, 3000);
      } else {
        ClientHandler.success({
          title: '¡Cuenta creada!',
          description: 'Bienvenido a ServiceFlow',
        });
        router.push(APP_ROUTES.HOME);
      }
    } catch (err) {
      ClientHandler.error({
        title: 'Error al crear la cuenta',
        description: err instanceof Error ? err.message : 'Error desconocido',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] p-4 dark:from-[#1E293B] dark:to-[#0F172A]">
      <Card className="w-full max-w-md shadow-2xl border-0 !bg-white dark:!bg-white overflow-hidden">
        <div className="text-center pb-6 pt-8 bg-gradient-to-br from-[#10B981]/5 to-[#2563EB]/5 px-8">
          <div className="flex justify-center mb-6">
            <Image
              src={logoLogin}
              alt="ServiceFlow Logo"
              width={500}
              height={116}
              className="w-full h-auto drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2">
            ¡Comienza tu prueba gratis!
          </h1>
          <p className="text-[#64748B] text-base">
            5 días de acceso completo sin tarjeta
          </p>
        </div>

        <div className="px-8 pt-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#111827] dark:text-[#111827] font-medium">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Juan Pérez"
                className="!text-[#111827] !border-[#CBD5E1] !bg-[#F8FAFC] focus:!border-[#10B981] focus:!ring-[#10B981] placeholder:!text-[#94A3B8] h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#111827] dark:text-[#111827] font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="tu@email.com"
                className="!text-[#111827] !border-[#CBD5E1] !bg-[#F8FAFC] focus:!border-[#10B981] focus:!ring-[#10B981] placeholder:!text-[#94A3B8] h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#111827] dark:text-[#111827] font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="!text-[#111827] !border-[#CBD5E1] !bg-[#F8FAFC] focus:!border-[#10B981] focus:!ring-[#10B981] placeholder:!text-[#94A3B8] h-11 [&_button]:!text-[#111827] [&_button]:!opacity-100 [&_button:hover]:!text-[#059669]"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planSlug" className="text-[#111827] dark:text-[#111827] font-medium">
                Tipo de negocio
              </Label>
              <Select
                options={PLAN_OPTIONS}
                value={formData.planSlug}
                onValueChange={(value: string | number) =>
                  setFormData({ ...formData, planSlug: value as string })
                }
                className="!text-[#111827] !border-[#CBD5E1] !bg-[#F8FAFC] focus:!border-[#10B981] focus:!ring-[#10B981] h-11"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-[#10B981] to-[#2563EB] hover:from-[#059669] hover:to-[#1D4ED8] text-white font-semibold shadow-lg" 
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Comenzar prueba gratis"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B]">
              ¿Ya tienes cuenta?{" "}
              <a 
                href={APP_ROUTES.LOGIN} 
                className="text-[#10B981] hover:text-[#059669] font-semibold hover:underline transition-colors"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
