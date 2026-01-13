"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Image
              src="/logo-principal.png"
              alt="ServiceFlow"
              width={180}
              height={42}
              className="h-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma completa para gestionar tu negocio de forma
              profesional y eficiente.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Producto</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-muted-foreground hover:text-[#10B981] transition-colors text-sm"
                >
                  Características
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-muted-foreground hover:text-[#10B981] transition-colors text-sm"
                >
                  Precios
                </button>
              </li>
              <li>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_APP_URL!
                  }
                  className="text-muted-foreground hover:text-[#10B981] transition-colors text-sm"
                >
                  Ingresar al Sistema
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#10B981] transition-colors text-sm"
                >
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#10B981] transition-colors text-sm"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <span>contacto@serviceflow.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <span>+54 9 381 352-8658</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <span>Tucumán, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ServiceFlow. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
