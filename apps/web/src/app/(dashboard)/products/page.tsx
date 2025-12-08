"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    { id: "1", name: "Laptop HP", sku: "LAP-001", category: "Computadoras", price: 15000, cost: 12000, stock: 5, reorderLevel: 2 },
    { id: "2", name: "Mouse Logitech", sku: "MOU-001", category: "Accesorios", price: 500, cost: 300, stock: 25, reorderLevel: 10 },
    { id: "3", name: "Teclado Mecánico", sku: "TEC-001", category: "Accesorios", price: 1200, cost: 800, stock: 3, reorderLevel: 5 },
  ];

  const columns: TableColumn<Product>[] = [
    { key: "name", header: "Producto", sortable: true },
    { key: "sku", header: "SKU", sortable: true },
    {
      key: "category",
      header: "Categoría",
      sortable: true,
      render: (product) => <Badge variant="outline" size="sm">{product.category}</Badge>,
    },
    {
      key: "price",
      header: "Precio",
      align: "right",
      sortable: true,
      render: (product) => `$${product.price.toLocaleString()}`,
    },
    {
      key: "stock",
      header: "Stock",
      align: "right",
      sortable: true,
      render: (product) => (
        <Badge variant={product.stock <= product.reorderLevel ? "destructive" : "success"} size="sm">
          {product.stock}
        </Badge>
      ),
    },
  ];

  const actions: TableAction<Product>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (product) => {
        setSelectedProduct(product);
        setModalMode("view");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      variant: "ghost",
      onClick: (product) => {
        setSelectedProduct(product);
        setModalMode("update");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      variant: "destructive",
      onClick: (product) => {
        setSelectedProduct(product);
        setModalMode("delete");
        setIsModalOpen(true);
      },
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "create") {
      ClientHandler.success("Producto creado correctamente");
    } else if (modalMode === "update") {
      ClientHandler.success("Producto actualizado correctamente");
    } else if (modalMode === "delete") {
      ClientHandler.success("Producto eliminado correctamente");
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Productos</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona tu inventario de productos</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button onClick={() => { setModalMode("create"); setIsModalOpen(true); }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Producto
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">



      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Productos</p>
            <p className="text-2xl font-bold text-foreground">{products.length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stock Total</p>
            <p className="text-2xl font-bold text-foreground">{products.reduce((acc, p) => acc + p.stock, 0)}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stock Bajo</p>
            <p className="text-2xl font-bold text-destructive">{products.filter(p => p.stock <= p.reorderLevel).length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Valor Inventario</p>
            <p className="text-2xl font-bold text-foreground">${products.reduce((acc, p) => acc + (p.cost * p.stock), 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <GenericTable
        data={products}
        columns={columns}
        actions={actions}
        searchable
        searchPlaceholder="Buscar por nombre, SKU o categoría..."
        emptyMessage="No hay productos registrados"
      />

      {/* Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        title={modalMode === "create" ? "Nuevo Producto" : modalMode === "update" ? "Editar Producto" : modalMode === "delete" ? "Eliminar Producto" : "Detalles del Producto"}
      >
        {modalMode === "delete" ? (
          <p>¿Está seguro que desea eliminar <strong>{selectedProduct?.name}</strong>?</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Formulario de producto aquí</p>
          </div>
        )}
      </GenericModal>
      </div>
    </>
  );
}
