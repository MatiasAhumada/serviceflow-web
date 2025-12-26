"use client";

import { toast } from "sonner";

export type NotificationType = "success" | "error" | "warning" | "info" | "loading" | "promise";

export interface NotificationOptions {
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export class ClientHandler {
  static success(options: NotificationOptions | string) {
    if (typeof options === "string") {
      toast.success(options);
    } else {
      toast.success(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action,
      });
    }
  }

  static error(options: NotificationOptions | string) {
    if (typeof options === "string") {
      toast.error(options);
    } else {
      toast.error(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action,
      });
    }
  }

  static warning(options: NotificationOptions | string) {
    if (typeof options === "string") {
      toast.warning(options);
    } else {
      toast.warning(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action,
      });
    }
  }

  static info(options: NotificationOptions | string) {
    if (typeof options === "string") {
      toast.info(options);
    } else {
      toast.info(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action,
      });
    }
  }

  static loading(message: string) {
    return toast.loading(message);
  }

  static promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) {
    return toast.promise(promise, messages);
  }

  static dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }

  static custom(jsx: (id: string | number) => React.ReactElement, options?: { duration?: number }) {
    return toast.custom(jsx, options);
  }
}
