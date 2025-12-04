"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "destructive" | "warning";
  duration?: number;
}

interface ToastProps extends ToastData {
  onRemove: (id: string) => void;
}

export function Toast({ id, title, description, variant = "default", duration = 5000, onRemove }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      className={cn(
        "relative w-full max-w-sm p-4 rounded-lg border shadow-lg animate-in slide-in-from-top-2",
        {
          "bg-background text-foreground border-border": variant === "default",
          "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-green-500/20": variant === "success",
          "bg-destructive/10 dark:bg-destructive/20 text-destructive border-destructive/20": variant === "destructive",
          "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 border-yellow-500/20": variant === "warning"
        }
      )}
    >
      <button
        onClick={() => onRemove(id)}
        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        ✕
      </button>
      
      <div className="pr-6">
        <div className="font-semibold text-sm">{title}</div>
        {description && (
          <div className="text-sm opacity-90 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastData, "id">) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}