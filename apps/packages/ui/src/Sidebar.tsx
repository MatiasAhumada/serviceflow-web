import * as React from "react";
import { cn } from "./lib/utils";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({
  items,
  isOpen,
  onToggle,
  header,
  footer,
  className
}: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-background border-r border-border transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isOpen ? "w-64" : "lg:w-16",
          className
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-6 z-10 bg-background border border-border rounded-full p-1 shadow-md hover:bg-muted"
        >
          <span className="block w-4 h-4 text-xs text-center font-sans">
            {isOpen ? "◀" : "▶"}
          </span>
        </button>

        <div className="flex flex-col h-full">
          {/* Header */}
          {header && (
            <div className={cn(
              "p-4 border-b border-border",
              !isOpen && "lg:px-2"
            )}>
              {isOpen ? header : null}
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const ItemComponent = item.href ? "a" : "button";
              
              return (
                <ItemComponent
                  key={item.id}
                  href={item.href}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-sans transition-colors",
                    "hover:bg-muted focus:bg-muted focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    item.active && "bg-primary text-primary-foreground hover:bg-primary/90",
                    !isOpen && "lg:justify-center lg:px-2"
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0 w-5 h-5">
                      {item.icon}
                    </span>
                  )}
                  
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </ItemComponent>
              );
            })}
          </nav>

          {/* Footer */}
          {footer && isOpen && (
            <div className="p-4 border-t border-border">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}