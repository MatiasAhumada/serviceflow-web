import type { Metadata } from "next";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "ServiceFlow - Gestión Integral de Ventas e Inventario",
  description:
    "Plataforma completa para gestionar ventas, inventario, órdenes de servicio técnico y clientes. Sistema de punto de venta con facturación AFIP. Optimiza tu negocio con ServiceFlow.",
  keywords: [
    "gestión",
    "ventas",
    "inventario",
    "service flow",
    "punto de venta",
    "facturación AFIP",
    "órdenes de servicio",
    "CRM",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_LANDING_URL || "https://serviceflow.com",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: process.env.NEXT_PUBLIC_LANDING_URL || "https://serviceflow.com",
    title: "ServiceFlow - Gestión Integral de Ventas e Inventario",
    description:
      "Plataforma completa para gestionar ventas, inventario, órdenes de servicio técnico y clientes. Sistema de punto de venta con facturación AFIP. Optimiza tu negocio con ServiceFlow.",
    siteName: "ServiceFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiceFlow - Gestión Integral de Ventas e Inventario",
    description:
      "Plataforma completa para gestionar ventas, inventario, órdenes de servicio técnico y clientes. Sistema de punto de venta con facturación AFIP.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
