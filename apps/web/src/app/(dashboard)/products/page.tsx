"use client";

import { useState, useRef } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import { ProductForm } from "@/components/features";
import type { TableColumn, TableAction } from "@/components/common";
import { useProducts, useDebounce } from "@/hooks";
import type { Product } from "@/types";

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const formRef = useRef<HTMLFormElement>(null);

  const { products, stats, isLoading, createProduct, updateProduct, deleteProduct } = useProducts({
    search: debouncedSearch,
  });

  const columns: TableColumn<Product>[] = [
    { key: "name", header: "Producto", sortable: true },
    { key: "sku", header: "SKU", sortable: true },
    {
      key: "category",
      header: "Categoría",
      sortable: true,
      render: (product) => product.category ? <Badge variant="outline" size="sm">{product.category}</Badge> : "-",
    },
    {
      key: "supplier",
      header: "Proveedor",
      sortable: true,
      render: (product) => product.suppliers?.[0]?.name || "-",
    },
    {
      key: "price",
      header: "Precio",
      align: "right",
      sortable: true,
      render: (product) => `$${product.price.toLocaleString()}`,
    },
    {
      key: "stockQuantity",
      header: "Stock",
      align: "right",
      sortable: true,
      render: (product) => (
        <Badge variant={product.stockQuantity <= (product.reorderLevel || 0) ? "destructive" : "success"} size="sm">
          {product.stockQuantity}
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
    if (modalMode === "delete" && selectedProduct) {
      const success = await deleteProduct(selectedProduct.id);
      if (success) {
        setIsModalOpen(false);
        setSelectedProduct(null);
      }
      return;
    }

    formRef.current?.requestSubmit();
  };

  const handleFormSubmitInternal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData = {
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      cost: formData.get("cost") ? parseFloat(formData.get("cost") as string) : undefined,
      stockQuantity: parseInt(formData.get("stockQuantity") as string) || 0,
      reorderLevel: formData.get("reorderLevel") ? parseInt(formData.get("reorderLevel") as string) : undefined,
      supplierId: formData.get("supplierId") as string || undefined,
    };

    let success = false;

    if (modalMode === "create") {
      success = await createProduct(productData);
    } else if (modalMode === "update" && selectedProduct) {
      success = await updateProduct(selectedProduct.id, productData);
    }

    if (success) {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
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
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Stock Total</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalStock}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Stock Bajo</p>
              <p className="text-2xl font-bold text-destructive">{stats.lowStock}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Valor Inventario</p>
              <p className="text-2xl font-bold text-foreground">${stats.inventoryValue.toLocaleString()}</p>
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
          onSearch={setSearchTerm}
          loading={isLoading}
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
          ) : modalMode === "view" && selectedProduct ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                <p className="text-base">{selectedProduct.name}</p>
              </div>
              {selectedProduct.sku && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SKU</p>
                  <p className="text-base">{selectedProduct.sku}</p>
                </div>
              )}
              {selectedProduct.category && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categoría</p>
                  <p className="text-base">{selectedProduct.category}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.cost && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Precio Compra</p>
                    <p className="text-base">${selectedProduct.cost.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Precio Venta</p>
                  <p className="text-base">${selectedProduct.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p className="text-base">{selectedProduct.stockQuantity}</p>
                </div>
                {selectedProduct.reorderLevel && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nivel Reorden</p>
                    <p className="text-base">{selectedProduct.reorderLevel}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleFormSubmitInternal}>
              <ProductForm product={selectedProduct} />
            </form>
          )}
        </GenericModal>
      </div>
    </>
  );
}
