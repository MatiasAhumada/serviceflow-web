"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectWrapperProps {
  options: SelectOption[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

export function SelectWrapper({
  options,
  value,
  onValueChange,
  placeholder = "Seleccionar...",
  disabled = false,
  className,
}: SelectWrapperProps) {
  return (
    <Select
      value={value?.toString()}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
