import * as React from "react";
import Image from "next/image";
import { cn } from "./lib/utils";
import logoSide from "../../../public/assets/logo-side.png";
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
          "fixed left-0 top-0 z-50 h-full bg-background border-r-2 border-border transition-all duration-300 ease-in-out shadow-xl",
          "lg:relative lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isOpen ? "w-72" : "lg:w-20",
          className
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-4 top-8 z-10 bg-primary border-2 border-background rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all duration-200"
        >
          <span className="block w-4 h-4 text-xs text-center text-primary-foreground font-bold">
            {isOpen ? "◀" : "▶"}
          </span>
        </button>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-background to-muted/20 rounded-xl flex items-center justify-center shadow-lg border border-border/50 p-2">
                <Image 
                  src={logoSide} 
                  alt="ServiceFlow" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              {isOpen && (
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-foreground leading-tight">
                    Service<span className="text-primary">Flow</span>
                  </h1>
                  <p className="text-xs text-muted font-medium">Panel de Control</p>
                </div>
              )}
            </div>
          </div>
          {header && isOpen && (
            <div className="px-4 py-2">
              {header}
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
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed text-muted",
                    item.active && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
                    !isOpen && "lg:justify-center lg:px-3"
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
                        <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
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