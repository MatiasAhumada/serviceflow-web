import { Input, Label, Textarea } from "@/components/ui";
import { TAX_CONDITIONS, DOCUMENT_TYPES } from "@/constants/fiscal.constants";
import type { Customer } from "@/types";

interface CustomerFormProps {
  customer?: Customer | null;
}

export function CustomerForm({ customer }: CustomerFormProps) {
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
          <select
            id="taxCondition"
            name="taxCondition"
            defaultValue={customer?.taxCondition || "CONSUMIDOR_FINAL"}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {TAX_CONDITIONS.map((condition) => (
              <option key={condition.value} value={condition.value}>
                {condition.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="documentType">Tipo de Documento</Label>
          <select
            id="documentType"
            name="documentType"
            defaultValue={customer?.documentType || "DNI"}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {DOCUMENT_TYPES.map((docType) => (
              <option key={docType.value} value={docType.value}>
                {docType.label}
              </option>
            ))}
          </select>
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
