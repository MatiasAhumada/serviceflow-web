"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void | Promise<void>;
  variant?: "default" | "outline" | "destructive" | "ghost";
  show?: (item: T) => boolean;
}

interface GenericTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
  rowClassName?: (item: T) => string;
  onRowClick?: (item: T) => void;
}

export function GenericTable<T = Record<string, unknown>>({
  data,
  columns,
  actions,
  searchable = false,
  searchPlaceholder = "Buscar...",
  onSearch,
  emptyMessage = "No hay datos disponibles",
  loading = false,
  className,
  rowClassName,
  onRowClick,
}: GenericTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [loadingActions, setLoadingActions] = React.useState<Record<string, boolean>>({});

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc"
          ? { key, direction: "desc" }
          : null;
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortConfig.key];
      const bValue = (b as Record<string, unknown>)[sortConfig.key];

      const aComp = aValue ?? "";
      const bComp = bValue ?? "";

      if (aComp < bComp) return sortConfig.direction === "asc" ? -1 : 1;
      if (aComp > bComp) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm || onSearch) return sortedData;

    return sortedData.filter((item) =>
      Object.values(item as Record<string, unknown>).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm, onSearch]);

  const getCellValue = (item: T, column: TableColumn<T>, index: number) => {
    if (column.render) return column.render(item, index);
    return String(item[column.key as keyof T] ?? "");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="flex items-center gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-4 py-3 text-sm font-medium text-muted-foreground text-center",
                      column.sortable && "cursor-pointer hover:text-foreground select-none"
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key as string)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {column.header}
                      {column.sortable && sortConfig?.key === column.key && (
                        <span className="text-xs">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground text-center">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "border-b border-border transition-colors",
                      onRowClick && "cursor-pointer hover:bg-muted/50",
                      rowClassName?.(item)
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-sm text-foreground text-center"
                      >
                        {getCellValue(item, column, rowIndex)}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {actions.map((action, actionIndex) => {
                            const shouldShow = action.show ? action.show(item) : true;
                            if (!shouldShow) return null;

                            const actionKey = `${rowIndex}-${actionIndex}`;
                            const isLoading = loadingActions[actionKey];

                            return (
                              <Button
                                key={actionIndex}
                                variant={action.variant || "outline"}
                                size="sm"
                                disabled={isLoading}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setLoadingActions(prev => ({ ...prev, [actionKey]: true }));
                                  try {
                                    await action.onClick(item);
                                  } finally {
                                    setLoadingActions(prev => ({ ...prev, [actionKey]: false }));
                                  }
                                }}
                              >
                                {isLoading ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                                ) : (
                                  <>
                                    {action.icon && (
                                      <span className="mr-1">{action.icon}</span>
                                    )}
                                    {action.label}
                                  </>
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredData.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredData.length} de {data.length} registros
        </div>
      )}
    </div>
  );
}
