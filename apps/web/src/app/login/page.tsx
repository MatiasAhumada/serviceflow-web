"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";
import logoLogin from "../../../public/assets/logo-principal.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        ClientHandler.error({
          title: "Error de login",
          description: "Credenciales inválidas",
        });
      } else {
        ClientHandler.success({
          title: "Login exitoso",
          description: "Bienvenido a ServiceFlow",
        });
        router.push("/");
      }
    } catch {
      ClientHandler.error({
        title: "Error",
        description: "Ocurrió un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] p-4 dark:from-[#1E293B] dark:to-[#0F172A]">
      <Card
        className="w-full max-w-md shadow-2xl border-0 !bg-white dark:!bg-white overflow-hidden"
        variant="elevated"
      >
        <CardHeader className="text-center pb-6 pt-8 bg-gradient-to-br from-[#10B981]/5 to-[#2563EB]/5">
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
          <CardTitle className="text-3xl font-bold text-[#111827] mb-2">
            ¡Bienvenido de nuevo!
          </CardTitle>
          <p className="text-[#64748B] text-base">
            Ingresa a tu cuenta para continuar
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#111827] dark:text-[#111827] font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="!text-[#111827] !border-[#CBD5E1] !bg-[#F8FAFC] focus:!border-[#10B981] focus:!ring-[#10B981] placeholder:!text-[#94A3B8] h-11 [&_button]:!text-[#111827] [&_button]:!opacity-100 [&_button:hover]:!text-[#059669]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-[#10B981] to-[#2563EB] hover:from-[#059669] hover:to-[#1D4ED8] text-white font-semibold shadow-lg" 
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B]">
              ¿No tienes una cuenta?{" "}
              <a 
                href="/register-trial" 
                className="text-[#10B981] hover:text-[#059669] font-semibold hover:underline transition-colors"
              >
                Comienza gratis
              </a>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
            <p className="text-xs font-semibold text-[#111827] mb-3">
              🧪 Cuentas Demo (Desarrollo):
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="p-2 bg-purple-500/5 rounded border border-purple-500/20">
                <p className="text-xs font-semibold text-purple-600">Admin Empresa</p>
                <p className="text-xs text-[#64748B]">admin@empresa.com / 123456</p>
              </div>
              <div className="p-2 bg-green-500/5 rounded border border-green-500/20">
                <p className="text-xs font-semibold text-green-600">Vendedores</p>
                <p className="text-xs text-[#64748B]">vendedor1@empresa.com / 123456</p>
                <p className="text-xs text-[#64748B]">vendedor2@empresa.com / 123456</p>
              </div>
              <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                <p className="text-xs font-semibold text-blue-600">Técnicos</p>
                <p className="text-xs text-[#64748B]">tecnico1@empresa.com / 123456</p>
                <p className="text-xs text-[#64748B]">tecnico2@empresa.com / 123456</p>
                <p className="text-xs text-[#64748B]">tecnico3@empresa.com / 123456</p>
              </div>
              <div className="p-2 bg-orange-500/5 rounded border border-orange-500/20">
                <p className="text-xs font-semibold text-orange-600">Cajero</p>
                <p className="text-xs text-[#64748B]">cajero@empresa.com / 123456</p>
              </div>
              <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                <p className="text-xs font-semibold text-emerald-600">Vendedor Individual</p>
                <p className="text-xs text-[#64748B]">vendedor.individual@gmail.com / 123456</p>
              </div>
              <div className="p-2 bg-cyan-500/5 rounded border border-cyan-500/20">
                <p className="text-xs font-semibold text-cyan-600">Técnico Individual</p>
                <p className="text-xs text-[#64748B]">tecnico.individual@gmail.com / 123456</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
