"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
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
      <Card className="w-full max-w-md shadow-2xl border-0 !bg-white dark:!bg-white" variant="elevated">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Image src={logoLogin} alt="ServiceFlow Logo" width={500} height={116} className="w-full h-auto drop-shadow-lg" priority />
          </div>
          <CardTitle className="text-2xl font-bold text-[#111827]">Bienvenido</CardTitle>
          <p className="text-[#64748B] text-base mt-2">Inicia sesión en tu cuenta</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@serviceflow.com"
              className="placeholder:text-[#111827]"
              required
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="placeholder:text-[#111827]"
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-[#111827]">🏢 Empresa Demo:</p>

            <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <p className="text-xs font-semibold text-purple-600 mb-1">Admin Empresa</p>
              <p className="text-xs text-[#64748B]">admin@empresa.com / 123456</p>
            </div>

            <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <p className="text-xs font-semibold text-green-600 mb-1">Vendedores</p>
              <p className="text-xs text-[#64748B]">vendedor1@empresa.com / 123456</p>
              <p className="text-xs text-[#64748B]">vendedor2@empresa.com / 123456</p>
            </div>

            <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <p className="text-xs font-semibold text-blue-600 mb-1">Técnicos</p>
              <p className="text-xs text-[#64748B]">tecnico1@empresa.com / 123456</p>
              <p className="text-xs text-[#64748B]">tecnico2@empresa.com / 123456</p>
              <p className="text-xs text-[#64748B]">tecnico3@empresa.com / 123456</p>
            </div>

            <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <p className="text-xs font-semibold text-orange-600 mb-1">Cajero</p>
              <p className="text-xs text-[#64748B]">cajero@empresa.com / 123456</p>
            </div>

            <p className="text-sm font-semibold text-[#111827] mt-4">👤 Individuales:</p>

            <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
              <p className="text-xs font-semibold text-emerald-600 mb-1">Vendedor Individual</p>
              <p className="text-xs text-[#64748B]">vendedor.individual@gmail.com / 123456</p>
            </div>

            <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
              <p className="text-xs font-semibold text-cyan-600 mb-1">Técnico Individual</p>
              <p className="text-xs text-[#64748B]">tecnico.individual@gmail.com / 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
