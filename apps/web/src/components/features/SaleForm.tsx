"use client";

import { useState } from "react";
import { Button, Input, Label, Select } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";
import { useCustomers } from "@/hooks/useCustomers";
import { CreateSaleDto, CreateSaleItemDto } from "@/types";

interface SaleFormProps {
  onSubmit?: (data: CreateSaleDto) => void;
  defaultValue?: Record<string, unknown>;
}

const PAYMENT_METHODS = [
  { value: "cash", label: "Efectivo" },
  { value: "debit_card", label: "Tarjeta de Débito" },
  { value: "credit_card", label: "Tarjeta de Crédito" },
  { value: "transfer", label: "Transferencia" },
  { value: "qr", label: "QR" },
  { value: "mercadopago", label: "MercadoPago" },
];

const CARD_BRANDS = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "cabal", label: "Cabal" },
  { value: "naranja", label: "Naranja" },
  { value: "nativa", label: "Nativa" },
  { value: "maestro", label: "Maestro" },
  { value: "amex", label: "American Express" },
];

const CARD_TYPES = [
  { value: "credit", label: "Crédito" },
  { value: "debit", label: "Débito" },
  { value: "prepaid", label: "Prepaga" },
];

export function SaleForm({ onSubmit }: SaleFormProps) {
  const { products } = useProducts();
  const { customers } = useCustomers();
  const [items, setItems] = useState<CreateSaleItemDto[]>([]);
  const [customerId, setCustomerId] = useState<string | number>("");
  const [selectedProduct, setSelectedProduct] = useState<string | number>("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | number>("cash");
  const [cardBrand, setCardBrand] = useState<string | number>("");
  const [cardType, setCardType] = useState<string | number>("");
  const showCardDetails = paymentMethod === "debit_card" || paymentMethod === "credit_card";

  const handleAddItem = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const existingItem = items.find((i) => i.productId === selectedProduct);
    if (existingItem) {
      setItems(items.map((i) => (i.productId === selectedProduct ? { ...i, quantity: i.quantity + quantity } : i)));
    } else {
      setItems([
        ...items,
        {
          productId: product.id,
          quantity,
          unitPrice: product.price,
        },
      ]);
    }
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleRemoveItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId));
  };

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || "";
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const saleData: CreateSaleDto = {
      customerId: String(customerId),
      paymentMethod: String(paymentMethod),
      items,
      discount: parseFloat(formData.get("discount") as string) || 0,
    };

    if (showCardDetails) {
      saleData.cardDetail = {
        cardBrand: String(cardBrand),
        cardType: String(cardType),
        lastFourDigits: formData.get("lastFourDigits") as string,
        installments: parseInt(formData.get("installments") as string) || 1,
      };
    }

    onSubmit?.(saleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="customerId">Cliente *</Label>
        <Select
          options={customers.map((c) => ({ value: c.id, label: c.name }))}
          value={customerId}
          onValueChange={setCustomerId}
          placeholder="Seleccionar cliente"
        />
      </div>

      <div>
        <Label htmlFor="paymentMethod">Método de Pago *</Label>
        <Select options={PAYMENT_METHODS} value={paymentMethod} onValueChange={setPaymentMethod} placeholder="Seleccionar método" />
      </div>

      {showCardDetails && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cardBrand">Marca de Tarjeta *</Label>
              <Select options={CARD_BRANDS} value={cardBrand} onValueChange={setCardBrand} placeholder="Seleccionar marca" />
            </div>
            <div>
              <Label htmlFor="cardType">Tipo de Tarjeta *</Label>
              <Select options={CARD_TYPES} value={cardType} onValueChange={setCardType} placeholder="Seleccionar tipo" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastFourDigits">Últimos 4 Dígitos *</Label>
              <Input id="lastFourDigits" name="lastFourDigits" maxLength={4} pattern="[0-9]{4}" required />
            </div>
            <div>
              <Label htmlFor="installments">Cuotas *</Label>
              <Input id="installments" name="installments" type="number" min="1" max="12" defaultValue="1" required />
            </div>
          </div>
        </>
      )}

      <div className="border-t pt-4">
        <Label>Productos</Label>
        <div className="flex gap-2 mt-2">
          <Select
            options={products.map((p) => ({ value: p.id, label: `${p.name} - $${p.price}` }))}
            value={selectedProduct}
            onValueChange={setSelectedProduct}
            placeholder="Seleccionar producto"
            className="flex-1"
          />
          <Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-20" />
          <Button type="button" onClick={handleAddItem} disabled={!selectedProduct}>
            Agregar
          </Button>
        </div>

        {items.length > 0 && (
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>{getProductName(item.productId)}</span>
                <span>x{item.quantity}</span>
                <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
                <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveItem(item.productId)}>
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="discount">Descuento</Label>
        <Input id="discount" name="discount" type="number" min="0" step="0.01" defaultValue="0" />
      </div>

      <div className="border-t pt-4">
        <div className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</div>
      </div>

      <Button type="submit" className="w-full" disabled={items.length === 0}>
        Crear Venta
      </Button>
    </form>
  );
}
