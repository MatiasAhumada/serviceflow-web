"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input } from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: "1", name: "Laptop HP", sku: "LAP-001", category: "Computadoras", price: 15000, cost: 12000, stock: 5, reorderLevel: 2 },
    { id: "2", name: "Mouse Logitech", sku: "MOU-001", category: "Accesorios", price: 500, cost: 300, stock: 25, reorderLevel: 10 },
    { id: "3", name: "Teclado Mecánico", sku: "TEC-001", category: "Accesorios", price: 1200, cost: 800, stock: 3, reorderLevel: 5 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Productos</h1>
            <p className="text-sm text-muted-foreground">Gestiona tu inventario de productos</p>
          </div>
        </div>
        <Button onClick={() => ClientHandler.info("Crear nuevo producto")} className="-mr-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Producto
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por nombre, SKU o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

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

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Producto</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">SKU</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Categoría</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Precio</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="p-3">
                      <p className="font-medium text-foreground">{product.name}</p>
                    </td>
                    <td className="p-3 text-muted-foreground">{product.sku}</td>
                    <td className="p-3">
                      <Badge variant="outline" size="sm">{product.category}</Badge>
                    </td>
                    <td className="p-3 text-right font-medium text-foreground">${product.price.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <Badge variant={product.stock <= product.reorderLevel ? "destructive" : "success"} size="sm">
                        {product.stock}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => ClientHandler.info(`Ver detalles de ${product.name}`)}>
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
