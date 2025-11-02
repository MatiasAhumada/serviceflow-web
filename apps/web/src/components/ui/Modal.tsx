import * as React from "react";
import { cn } from "./lib/utils";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  className
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={cn(
        "relative bg-background border border-border rounded-lg shadow-lg max-w-md w-full mx-4",
        className
      )}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
          <div className="text-muted mb-6">{children}</div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onCancel || onClose}
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                onClick={onConfirm}
                className={variant === "destructive" ? "bg-destructive hover:bg-destructive/90" : ""}
              >
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}