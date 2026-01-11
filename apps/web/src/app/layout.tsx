import type { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ServiceFlow",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Sistema completo de gestión para talleres de reparación, servicios técnicos y comercios. Administra clientes, productos, inventario, órdenes de trabajo, ventas y caja.",
  featureList: [
    "Gestión de clientes",
    "Control de inventario",
    "Órdenes de trabajo",
    "Punto de venta",
    "Facturación electrónica",
    "Control de caja",
    "Gestión de proveedores",
    "Reportes y estadísticas",
  ],
};
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "ServiceFlow - Software para Venta y Reparación de Electrónica | Servicio Técnico",
  description:
    "Sistema integral para negocios de electrónica: vendedores, service técnico y talleres de reparación. Gestiona ventas, reparaciones, inventario, clientes y facturación. Ideal para celulares, computadoras, electrodomésticos y electrónica en general.",
  keywords: [
    "software service electrónica",
    "sistema taller reparación celulares",
    "software venta electrónica",
    "gestión service técnico",
    "software reparación computadoras",
    "sistema taller electrodomésticos",
    "software negocio electrónica",
    "gestión órdenes reparación",
    "software vendedor electrónica",
    "sistema service celulares",
    "software taller técnico",
    "gestión repuestos electrónica",
    "facturación service técnico",
    "software punto venta electrónica",
    "sistema reparación notebooks",
  ],
  authors: [{ name: "ServiceFlow" }],
  creator: "ServiceFlow",
  publisher: "ServiceFlow",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://serviceflow.app",
    title: "ServiceFlow - Software para Venta y Reparación de Electrónica",
    description:
      "Sistema integral para negocios de electrónica: vendedores, service técnico y talleres. Gestiona ventas, reparaciones, inventario y facturación. Ideal para celulares, computadoras y electrodomésticos.",
    siteName: "ServiceFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiceFlow - Software para Negocios de Electrónica",
    description:
      "Sistema integral para vendedores y service técnico de electrónica. Gestiona ventas, reparaciones e inventario desde la nube.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10B981",
};

import { AppProvider } from "@/contexts";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ReactQueryProvider>
            <AppProvider>{children}</AppProvider>
          </ReactQueryProvider>
          <Toaster richColors position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
