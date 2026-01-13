"use client";

import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_ROUTES } from "@/constants/routes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={scrollToTop} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo-principal.png" alt="ServiceFlow" width={180} height={42} className="h-auto" priority />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-foreground hover:text-[#10B981] transition-colors font-medium">
              Características
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-foreground hover:text-[#10B981] transition-colors font-medium">
              Precios
            </button>
            <Link
              href={APP_ROUTES.LOGIN}
              className="text-foreground hover:text-[#10B981] transition-colors font-medium"
            >
              Ingresar al Sistema
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={APP_ROUTES.LOGIN}>
              <Button variant="ghost" className="font-medium">
                Iniciar sesión
              </Button>
            </a>
            <a href={APP_ROUTES.REGISTER_TRIAL}>
              <Button variant="gradient" className="shadow-lg shadow-[#10B981]/20">
                Comenzar gratis
              </Button>
            </a>
          </div>

          <button className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-20 py-6 space-y-4 bg-white dark:bg-background border-b border-border shadow-lg animate-slide-down">
            <div className="container mx-auto px-4 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left py-3 px-4 text-[#10B981] hover:bg-accent rounded-lg transition-all font-medium"
              >
                Características
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left py-3 px-4 text-[#2563EB] hover:bg-accent rounded-lg transition-all font-medium"
              >
                Precios
              </button>
              <Link
                href="/app"
                className="block w-full text-left py-3 px-4 text-[#10B981] hover:bg-accent rounded-lg transition-all font-medium"
              >
                Ingresar al Sistema
              </Link>
              <div className="pt-4 space-y-3">
                <a href={APP_ROUTES.LOGIN} className="block">
                  <Button variant="ghost" className="w-full">
                    Iniciar sesión
                  </Button>
                </a>
                <a href={APP_ROUTES.REGISTER_TRIAL} className="block">
                  <Button variant="gradient" className="w-full">
                    Comenzar gratis
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
