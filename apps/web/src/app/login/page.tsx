"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Card, CardHeader, CardTitle, CardContent, useToast } from "@/components/ui";
import logoLogin from "../../../public/assets/logo-principal.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

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
        addToast({
          title: "Error de login",
          description: "Credenciales inválidas",
          variant: "destructive",
        });
      } else {
        addToast({
          title: "Login exitoso",
          description: "Bienvenido a ServiceFlow",
          variant: "success",
        });
        router.push("/");
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
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
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@serviceflow.com" required />
            <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456" required />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-[#2563EB]/5 rounded-lg border border-[#2563EB]/20">
            <p className="text-sm font-semibold text-[#2563EB] mb-2">👤 Usuario demo:</p>
            <p className="text-sm text-[#64748B]">Email: admin@serviceflow.com</p>
            <p className="text-sm text-[#64748B]">Contraseña: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
