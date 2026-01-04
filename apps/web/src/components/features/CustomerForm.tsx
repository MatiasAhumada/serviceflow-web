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
        <Input
          label="Nombre"
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
          <Input type="hidden" name="taxCondition" value={taxCondition} />
          <Select
            options={TAX_CONDITIONS}
            value={taxCondition}
            onValueChange={(value) => setTaxCondition(String(value))}
            placeholder="Seleccionar condición fiscal"
          />
        </div>

        <div>
          <Label htmlFor="documentType">Tipo de Documento</Label>
          <Input type="hidden" name="documentType" value={documentType} />
          <Select
            options={DOCUMENT_TYPES}
            value={documentType}
            onValueChange={(value) => setDocumentType(String(value))}
            placeholder="Seleccionar tipo de documento"
          />
        </div>
      </div>

      <div>
        <Input
          label="Número de Documento"
          id="documentNumber"
          name="documentNumber"
          defaultValue={customer?.documentNumber || ""}
          placeholder="Ej: 20-12345678-9 o 12345678"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Teléfono"
            id="phone"
            name="phone"
            defaultValue={customer?.phone || ""}
            placeholder="Teléfono de contacto"
          />
        </div>

        <div>
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            defaultValue={customer?.email || ""}
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <Textarea
          label="Notas"
          id="notes"
          name="notes"
          defaultValue={customer?.notes || ""}
          placeholder="Notas adicionales"
        />
      </div>
    </div>
  );
}
