export enum SALE_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PAYMENT_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PAYMENT_METHOD {
  CASH = 'cash',
  DEBIT_CARD = 'debit_card',
  CREDIT_CARD = 'credit_card',
  TRANSFER = 'transfer',
  QR = 'qr',
  MERCADOPAGO = 'mercadopago',
}

export enum CARD_BRAND {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMERICAN_EXPRESS = 'american_express',
  CABAL = 'cabal',
  NARANJA = 'naranja',
  NATIVA = 'nativa',
  MAESTRO = 'maestro',
}

export enum CARD_TYPE {
  CREDIT = 'credit',
  DEBIT = 'debit',
  PREPAID = 'prepaid',
}
