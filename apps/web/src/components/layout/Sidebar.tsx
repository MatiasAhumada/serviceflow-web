"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: () => void;
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

export function Sidebar({
  items,
  isOpen,
  onToggle,
  footer,
  className,
  user,
  userMenuOptions,
}: SidebarProps) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [openSubmenus, setOpenSubmenus] = React.useState<
    Record<string, boolean>
  >({});
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Toggle Button - Only visible on mobile */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed z-[60] bg-gradient-to-r from-[#10B981] to-[#2563EB] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 lg:hidden",
          isOpen ? "left-[232px] top-6" : "left-4 top-6",
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-background border-r border-border transition-all duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:w-20",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div
            className={cn(
              "border-b border-border",
              isOpen ? "p-4 sm:p-6" : "p-4 flex justify-center",
            )}
          >
            <button
              onClick={onToggle}
              className={cn(
                "flex items-center hover:opacity-80 transition-opacity ",
                isOpen ? "gap-3" : "justify-center mt-3",
              )}
            >
              <Image
                src="/favicon.ico"
                alt="ServiceFlow"
                width={isOpen ? 36 : 40}
                height={isOpen ? 36 : 40}
                className="rounded-lg"
              />
              {isOpen && (
                <div className="h-4 mb-5">
                  <h1 className="text-lg font-bold text-foreground">
                    Service<span className="text-[#2563EB]">Flow</span>
                  </h1>
                  <p className="text-xs text-muted-foreground font-medium">
                    Panel de Control
                  </p>
                </div>
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href || "");
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = openSubmenus[item.id];

              if (hasChildren) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() =>
                        setOpenSubmenus((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        "hover:bg-muted/10 focus:outline-none",
                        "text-muted-foreground hover:text-foreground hover:bg-accent",
                        !isOpen && "lg:justify-center lg:px-2",
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
                          <svg
                            className={cn(
                              "w-4 h-4 transition-transform",
                              isSubmenuOpen && "rotate-180",
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                    {isOpen && isSubmenuOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children?.map((child) => {
                          const isChildActive =
                            child.href === "/"
                              ? pathname === "/"
                              : pathname.startsWith(child.href || "");
                          return (
                            <Link
                              key={child.id}
                              href={child.href || "#"}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                isChildActive
                                  ? "bg-gradient-to-r from-[#10B981] to-[#2563EB] text-white shadow-lg"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                              )}
                            >
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const ItemComponent = item.href ? Link : "button";
              return (
                <ItemComponent
                  key={item.id}
                  href={item.href || "#"}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-muted/10 focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    isActive
                      ? "bg-gradient-to-r from-[#10B981] to-[#2563EB] text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    !isOpen && "lg:justify-center lg:px-2",
                  )}
                >
                  {item.icon && (
                    <span className={cn("flex-shrink-0 w-5 h-5")}>
                      {item.icon}
                    </span>
                  )}
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-xs px-2 py-1 rounded-full font-semibold">
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
            <div
              className={cn(
                "p-4 border-t border-border",
                !isOpen && "lg:flex lg:justify-center",
              )}
            >
              {isOpen ? (
                footer
              ) : (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors overflow-hidden"
                  >
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
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
                            "w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent transition-colors text-left",
                            option.variant === "destructive" &&
                              "text-destructive hover:bg-destructive/10",
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
      </div>
    </>
  );
}
