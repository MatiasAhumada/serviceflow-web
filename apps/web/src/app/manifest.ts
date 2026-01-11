import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ServiceFlow - Software para Venta y Reparación de Electrónica",
    short_name: "ServiceFlow",
    description:
      "Sistema integral para negocios de electrónica: vendedores, service técnico y talleres de reparación",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10B981",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
