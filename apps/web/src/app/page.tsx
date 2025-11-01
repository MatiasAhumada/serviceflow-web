"use client";

import { useApp } from "@/contexts";
import { Button } from "@serviceflow/ui";

export default function Home() {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">ServiceFlow</h1>
        
        <div className="mb-8">
          <Button onClick={toggleTheme} className="flex items-center gap-2">
            {theme === "light" ? "🌙" : "☀️"}
            {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
          </Button>
        </div>

        <div className="grid gap-4">
          <div className="p-6 border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tema actual: {theme}</h2>
            <p className="text-muted">Prueba el cambio de tema haciendo click en el botón de arriba.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
