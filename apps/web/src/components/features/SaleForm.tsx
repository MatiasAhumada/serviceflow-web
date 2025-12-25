'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Label, Select } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import { useCustomers } from '@/hooks/useCustomers';
import { CreateSaleDto, CreateSaleItemDto, Product } from '@/types';

interface SaleFormProps {
  onSubmit?: (data: CreateSaleDto) => void;
  defaultValue?: any;
}

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Efectivo' },
  { value: 'debit_card', label: 'Tarjeta de Débito' },
  { value: 'credit_card', label: 'Tarjeta de Crédito' },
  { value: 'transfer', label: 'Transferencia' },
  { value: 'qr', label: 'QR' },
  { value: 'mercadopago', label: 'MercadoPago' },
];

const CARD_BRANDS = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'cabal', label: 'Cabal' },
  { value: 'naranja', label: 'Naranja' },
  { value: 'nativa', label: 'Nativa' },
  { value: 'maestro', label: 'Maestro' },
  { value: 'amex', label: 'American Express' },
];

const CARD_TYPES = [
  { value: 'credit', label: 'Crédito' },
  { value: 'debit', label: 'Débito' },
  { value: 'prepaid', label: 'Prepaga' },
];

export function SaleForm({ onSubmit, defaultValue }: SaleFormProps) {
  const { products } = useProducts();
  const { customers } = useCustomers();
  const [items, setItems] = useState<CreateSaleItemDto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCardDetails, setShowCardDetails] = useState(false);

  useEffect(() => {
    setShowCardDetails(paymentMethod === 'debit_card' || paymentMethod === 'credit_card');
  }, [paymentMethod]);

  const handleAddItem = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const existingItem = items.find((i) => i.productId === selectedProduct);
    if (existingItem) {
      setItems(items.map((i) =>
        i.productId === selectedProduct
          ? { ...i, quantity: i.quantity + quantity }
          : i
      ));
    } else {
      setItems([...items, {
        productId: product.id,
        quantity,
        unitPrice: product.price,
      }]);
    }
    setSelectedProduct('');
    setQuantity(1);
  };

  const handleRemoveItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId));
  };

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || '';
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const saleData: CreateSaleDto = {
      customerId: formData.get('customerId') as string,
      paymentMethod: formData.get('paymentMethod') as string,
      items,
      discount: parseFloat(formData.get('discount') as string) || 0,
    };

    if (showCardDetails) {
      saleData.cardDetail = {
        cardBrand: formData.get('cardBrand') as string,
        cardType: formData.get('cardType') as string,
        lastFourDigits: formData.get('lastFourDigits') as string,
        installments: parseInt(formData.get('installments') as string) || 1,
      };
    }

    onSubmit?.(saleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="customerId">Cliente *</Label>
        <Select id="customerId" name="customerId" required>
          <option value="">Seleccionar cliente</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="paymentMethod">Método de Pago *</Label>
        <Select
          id="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </Select>
      </div>

      {showCardDetails && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cardBrand">Marca de Tarjeta *</Label>
              <Select id="cardBrand" name="cardBrand" required>
                {CARD_BRANDS.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="cardType">Tipo de Tarjeta *</Label>
              <Select id="cardType" name="cardType" required>
                {CARD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastFourDigits">Últimos 4 Dígitos *</Label>
              <Input
                id="lastFourDigits"
                name="lastFourDigits"
                maxLength={4}
                pattern="[0-9]{4}"
                required
              />
            </div>
            <div>
              <Label htmlFor="installments">Cuotas *</Label>
              <Input
                id="installments"
                name="installments"
                type="number"
                min="1"
                max="12"
                defaultValue="1"
                required
              />
            </div>
          </div>
        </>
      )}

      <div className="border-t pt-4">
        <Label>Productos</Label>
        <div className="flex gap-2 mt-2">
          <Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="flex-1"
          >
            <option value="">Seleccionar producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </Select>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20"
          />
          <Button type="button" onClick={handleAddItem} disabled={!selectedProduct}>
            Agregar
          </Button>
        </div>

        {items.length > 0 && (
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{getProductName(item.productId)}</span>
                <span>x{item.quantity}</span>
                <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="discount">Descuento</Label>
        <Input
          id="discount"
          name="discount"
          type="number"
          min="0"
          step="0.01"
          defaultValue="0"
        />
      </div>

      <div className="border-t pt-4">
        <div className="text-xl font-bold">
          Total: ${calculateTotal().toFixed(2)}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={items.length === 0}>
        Crear Venta
      </Button>
    </form>
  );
}
