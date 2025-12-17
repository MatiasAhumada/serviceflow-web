import { Input, Label } from "@/components/ui";
import type { Supplier } from "@/types";

interface SupplierFormProps {
  supplier?: Supplier | null;
}

export function SupplierForm({ supplier }: SupplierFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={supplier?.name || ""}
          required
          placeholder="Nombre del proveedor"
        />
      </div>

      <div>
        <Label htmlFor="contactInfo">Información de Contacto</Label>
        <Input
          id="contactInfo"
          name="contactInfo"
          defaultValue={supplier?.contactInfo || ""}
          placeholder="Persona de contacto"
        />
      </div>

      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          defaultValue={supplier?.phone || ""}
          placeholder="Teléfono de contacto"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={supplier?.email || ""}
          placeholder="correo@proveedor.com"
        />
      </div>
    </div>
  );
}
