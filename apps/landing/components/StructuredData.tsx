export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ServiceFlow",
    description:
      "Plataforma completa para gestionar ventas, inventario, órdenes de servicio técnico y clientes",
    url: process.env.NEXT_PUBLIC_LANDING_URL || "https://serviceflow.com",
    logo:
      `${process.env.NEXT_PUBLIC_LANDING_URL || "https://serviceflow.com"}/logo-principal.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-9-381-352-8658",
      contactType: "customer service",
      areaServed: "AR",
      availableLanguage: "Spanish",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tucumán",
      addressCountry: "AR",
    },
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ServiceFlow",
    url: process.env.NEXT_PUBLIC_LANDING_URL || "https://serviceflow.com",
    description:
      "Sistema de gestión integral para negocios: ventas, inventario, órdenes de servicio y CRM",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          `${process.env.NEXT_PUBLIC_LANDING_URL || "https://serviceflow.com"}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ServiceFlow",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ARS",
      lowPrice: "0",
      highPrice: "50000",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    description:
      "Sistema de punto de venta, gestión de inventario, órdenes de servicio técnico y CRM para negocios argentinos",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
