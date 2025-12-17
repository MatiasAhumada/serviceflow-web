"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type ModalMode = "create" | "update" | "delete" | "view";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  mode: ModalMode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const modalTitles: Record<ModalMode, string> = {
  create: "Crear nuevo",
  update: "Actualizar",
  delete: "Confirmar eliminación",
  view: "Ver detalles",
};

const modalDescriptions: Record<ModalMode, string> = {
  create: "Complete los campos para crear un nuevo registro",
  update: "Modifique los campos que desea actualizar",
  delete: "¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.",
  view: "Información del registro",
};

const confirmTexts: Record<ModalMode, string> = {
  create: "Crear",
  update: "Actualizar",
  delete: "Eliminar",
  view: "Cerrar",
};

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function GenericModal({
  isOpen,
  onClose,
  onConfirm,
  mode,
  title,
  description,
  children,
  confirmText,
  cancelText = "Cancelar",
  isLoading = false,
  size = "md",
  className,
}: GenericModalProps) {
  const handleConfirm = async () => {
    if (mode === "view") {
      onClose();
      return;
    }
    if (onConfirm) {
      await onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(sizeClasses[size], className)}>
        <DialogHeader>
          <DialogTitle>{title || modalTitles[mode]}</DialogTitle>
          {(description || mode === "delete") && (
            <DialogDescription>
              {description || modalDescriptions[mode]}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="py-4">{children}</div>}

        <DialogFooter>
          <Button
            type="button"
            variant={mode === "view" ? "outline" : mode === "delete" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : confirmText || confirmTexts[mode]}
          </Button>
          {mode !== "view" && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
