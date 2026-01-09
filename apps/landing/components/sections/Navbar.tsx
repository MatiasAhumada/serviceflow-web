"use client";

import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="ServiceFlow" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold">
              Service<span className="text-primary">Flow</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Características
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Precios
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">Iniciar sesión</Button>
            <Button variant="gradient">Comenzar gratis</Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <a href="#features" className="block py-2 text-foreground hover:text-primary transition-colors">
              Características
            </a>
            <a href="#pricing" className="block py-2 text-foreground hover:text-primary transition-colors">
              Precios
            </a>
            <a href="#contact" className="block py-2 text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full">Iniciar sesión</Button>
              <Button variant="gradient" className="w-full">Comenzar gratis</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
