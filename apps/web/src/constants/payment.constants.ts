export const PAYMENT_METHODS = {
  cash: "Efectivo",
  debit_card: "Débito",
  credit_card: "Crédito",
  transfer: "Transferencia",
  qr: "QR",
  mercadopago: "MercadoPago",
} as const;

export const PAYMENT_METHOD_OPTIONS = [
  { value: "cash", label: "Efectivo" },
  { value: "debit_card", label: "Tarjeta de Débito" },
  { value: "credit_card", label: "Tarjeta de Crédito" },
  { value: "transfer", label: "Transferencia" },
  { value: "qr", label: "QR" },
  { value: "mercadopago", label: "MercadoPago" },
];
