"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UserMenuOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface UserMenuProps {
  user: {
    name: string;
    email?: string;
    avatar?: string;
  };
  options: UserMenuOption[];
  className?: string;
}

export function UserMenu({ user, options, className }: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-foreground font-sans">{user.name}</div>
          {user.email && (
            <div className="text-xs text-muted font-sans">{user.email}</div>
          )}
        </div>
        <span className="text-muted text-xs">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border border-border rounded-md shadow-lg py-1">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-sans hover:bg-muted transition-colors",
                option.variant === "destructive" && "text-destructive hover:bg-destructive/10"
              )}
            >
              {option.icon && (
                <span className="w-4 h-4 flex-shrink-0">
                  {option.icon}
                </span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}