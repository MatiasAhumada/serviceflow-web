import { Input, Label, Textarea } from "@/components/ui";
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
