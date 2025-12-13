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
    } catch (error) {
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
      <Card className="w-full max-w-md shadow-2xl border-0" variant="elevated">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-6">
            <Image src={logoLogin} alt="ServiceFlow Logo" width={200} height={80} className="h-20 w-auto drop-shadow-lg" priority />
          </div>
          <CardTitle className="text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">Bienvenido de vuelta</CardTitle>
          <p className="text-[#64748B] text-base mt-2">Inicia sesión en tu cuenta</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@serviceflow.com" required />
            <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-foreground">🏢 Empresa Demo:</p>
            
            <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Admin Empresa</p>
              <p className="text-xs text-muted-foreground">admin@empresa.com / 123456</p>
            </div>
            
            <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Vendedores</p>
              <p className="text-xs text-muted-foreground">vendedor1@empresa.com / 123456</p>
              <p className="text-xs text-muted-foreground">vendedor2@empresa.com / 123456</p>
            </div>
            
            <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Técnicos</p>
              <p className="text-xs text-muted-foreground">tecnico1@empresa.com / 123456</p>
              <p className="text-xs text-muted-foreground">tecnico2@empresa.com / 123456</p>
              <p className="text-xs text-muted-foreground">tecnico3@empresa.com / 123456</p>
            </div>
            
            <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">Cajero</p>
              <p className="text-xs text-muted-foreground">cajero@empresa.com / 123456</p>
            </div>

            <p className="text-sm font-semibold text-foreground mt-4">👤 Individuales:</p>
            
            <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Vendedor Individual</p>
              <p className="text-xs text-muted-foreground">vendedor.individual@gmail.com / 123456</p>
            </div>
            
            <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Técnico Individual</p>
              <p className="text-xs text-muted-foreground">tecnico.individual@gmail.com / 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
