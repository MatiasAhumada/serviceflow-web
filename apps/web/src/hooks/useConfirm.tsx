"use client";

import { useState, useCallback } from "react";
import { GenericModal } from "@/components/common";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const handleConfirm = async () => {
    if (options?.onConfirm) {
      await options.onConfirm();
    }
    setIsOpen(false);
    setOptions(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setOptions(null);
  };

  const ConfirmDialog = () => (
    <GenericModal
      isOpen={isOpen}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      mode="delete"
      title={options?.title || "Confirmar"}
      confirmText={options?.confirmText}
      cancelText={options?.cancelText}
    >
      <p className="text-sm">{options?.message}</p>
    </GenericModal>
  );

  return { confirm, ConfirmDialog };
}
