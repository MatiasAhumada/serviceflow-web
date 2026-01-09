"use client";

import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
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
