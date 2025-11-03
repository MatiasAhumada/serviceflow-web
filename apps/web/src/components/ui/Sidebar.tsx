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
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  userMenuOptions?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive";
  }>;
}

export function Sidebar({ items, isOpen, onToggle, header, footer, className, user, userMenuOptions }: SidebarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-background border-r border-border transition-all duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:w-20",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className={cn("border-b border-border", isOpen ? "p-4 sm:p-6" : "p-4 flex justify-center")}>
            <div className={cn("flex items-center", isOpen ? "gap-3" : "justify-center")}>
              <div
                className={cn(
                  "bg-gradient-to-br from-[#10B981] to-[#2563EB] rounded-lg flex items-center justify-center shadow-lg",
                  isOpen ? "w-9 h-9" : "w-10 h-10 mb-2 mt-1"
                )}
              >
                <svg className={cn("text-white", isOpen ? "w-6 h-7" : "w-7 h-7")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              {isOpen && (
                <div className="h-4 mb-5">
                  <h1 className="text-lg font-bold text-[#111827] dark:text-white">
                    Service<span className="text-[#2563EB]">Flow</span>
                  </h1>
                  <p className="text-xs text-[#64748B] font-medium">Panel de Control</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {items.map((item) => {
              const ItemComponent = item.href ? "a" : "button";

              return (
                <ItemComponent
                  key={item.id}
                  href={item.href}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-muted/10 focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    item.active
                      ? "bg-[#2563EB] text-white shadow-md"
                      : "text-[#64748B] dark:text-[#64748B] hover:text-[#10B981] hover:bg-[#10B981]/20",
                    !isOpen && "lg:justify-center lg:px-2"
                  )}
                >
                  {item.icon && (
                    <span className={cn("flex-shrink-0 w-5 h-5", item.active ? "text-primary-foreground" : "text-muted")}>{item.icon}</span>
                  )}

                  {isOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 text-xs px-2 py-1 rounded-full font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </ItemComponent>
              );
            })}
          </nav>

          {/* Footer - Always at bottom */}
          {footer && (
            <div className={cn("p-4 border-t border-border", !isOpen && "lg:flex lg:justify-center")}>
              {isOpen ? (
                footer
              ) : (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-medium hover:bg-[#2563EB]/90 transition-colors overflow-hidden"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || "A"
                    )}
                  </button>

                  {isUserMenuOpen && userMenuOptions && (
                    <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-md shadow-lg py-1 min-w-[200px]">
                      {userMenuOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            option.onClick();
                            setIsUserMenuOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-sm font-sans hover:bg-muted transition-colors text-left",
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
              )}
            </div>
          )}
        </div>

        {/* Toggle Button */}
        {isOpen && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-6 bg-background border-2 border-border rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 lg:block hidden"
          >
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Collapsed Toggle Button */}
        {!isOpen && (
          <button
            onClick={onToggle}
            className="absolute -right-5 top-6 bg-background border-2 border-border rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 lg:block hidden"
          >
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
