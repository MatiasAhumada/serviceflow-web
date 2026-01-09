import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ServiceFlow - Gestión Integral para tu Negocio",
  description: "Plataforma completa para gestionar ventas, inventario, órdenes de servicio y más. Optimiza tu negocio con ServiceFlow.",
  keywords: ["gestión", "ventas", "inventario", "service flow", "punto de venta"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
