import { Input, Label, Select } from "@/components/ui";
import { useSuppliers } from "@/hooks";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductFormProps {
  product?: Product | null;
}

export function ProductForm({ product }: ProductFormProps) {
  const { suppliers } = useSuppliers();
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | number>(
    product?.suppliers?.[0]?.id || "",
  );

  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  return (
    <div className="space-y-4">
      <input type="hidden" name="supplierId" value={selectedSupplierId} />

      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name || ""}
          required
          placeholder="Nombre del producto"
        />
      </div>

      <div>
        <Label htmlFor="supplierId">Proveedor</Label>
        <Select
          options={supplierOptions}
          value={selectedSupplierId}
          onValueChange={setSelectedSupplierId}
          placeholder="Seleccionar proveedor"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            defaultValue={product?.sku || ""}
            placeholder="Código SKU"
          />
        </div>

        <div>
          <Label htmlFor="category">Categoría</Label>
          <Input
            id="category"
            name="category"
            defaultValue={product?.category || ""}
            placeholder="Categoría"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cost">Precio de Compra</Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.cost || ""}
            placeholder="0.00"
          />
        </div>

        <div>
          <Label htmlFor="price">Precio de Venta *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price || ""}
            required
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stockQuantity">Stock</Label>
          <Input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            min="0"
            defaultValue={product?.stockQuantity || 0}
            placeholder="0"
          />
        </div>

        <div>
          <Label htmlFor="reorderLevel">Nivel de Reorden</Label>
          <Input
            id="reorderLevel"
            name="reorderLevel"
            type="number"
            min="0"
            defaultValue={product?.reorderLevel || ""}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}
