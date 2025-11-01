import * as React from "react";
import { cn } from "./lib/utils";

export interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  searchable?: boolean;
  onValueChange: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
}

export function Select({
  options,
  value,
  placeholder = "Seleccionar...",
  searchable = false,
  onValueChange,
  className,
  disabled = false
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const selectRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onValueChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 text-left bg-background border border-border rounded-md text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isOpen && "ring-2 ring-primary border-transparent"
        )}
      >
        <span className={selectedOption ? "text-foreground" : "text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="p-2 border-b border-border">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm bg-background border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
            </div>
          )}
          
          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted">No se encontraron opciones</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-muted/50 focus:bg-muted/50 focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    value === option.value && "bg-primary/10 text-primary"
                  )}
                >
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-muted mt-1">{option.description}</div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}