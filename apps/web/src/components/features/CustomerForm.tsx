import { Input, Label, Textarea, Select } from "@/components/ui";
import { TAX_CONDITIONS, DOCUMENT_TYPES } from "@/constants/fiscal.constants";
import type { Customer } from "@/types";
import { useState } from "react";

interface CustomerFormProps {
  customer?: Customer | null;
}

export function CustomerForm({ customer }: CustomerFormProps) {
  const [taxCondition, setTaxCondition] = useState(customer?.taxCondition || "CONSUMIDOR_FINAL");
  const [documentType, setDocumentType] = useState(customer?.documentType || "DNI");

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={customer?.name || ""}
          required
          placeholder="Nombre del cliente"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="taxCondition">Condición Fiscal</Label>
          <input type="hidden" name="taxCondition" value={taxCondition} />
          <Select
            options={TAX_CONDITIONS}
            value={taxCondition}
            onValueChange={setTaxCondition}
            placeholder="Seleccionar condición fiscal"
          />
        </div>

        <div>
          <Label htmlFor="documentType">Tipo de Documento</Label>
          <input type="hidden" name="documentType" value={documentType} />
          <Select
            options={DOCUMENT_TYPES}
            value={documentType}
            onValueChange={setDocumentType}
            placeholder="Seleccionar tipo de documento"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="documentNumber">Número de Documento</Label>
        <Input
          id="documentNumber"
          name="documentNumber"
          defaultValue={customer?.documentNumber || ""}
          placeholder="Ej: 20-12345678-9 o 12345678"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={customer?.phone || ""}
            placeholder="Teléfono de contacto"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={customer?.email || ""}
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notas</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={customer?.notes || ""}
          placeholder="Notas adicionales"
        />
      </div>
    </div>
  );
}
