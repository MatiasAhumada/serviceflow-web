export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+54\s?)?(\d{2}\s?\d{4}\s?\d{4}|\d{10})$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ""));
};

export const isValidCUIT = (cuit: string): boolean => {
  const cleaned = cuit.replace(/[-\s]/g, "");
  if (cleaned.length !== 11) return false;
  
  const digits = cleaned.split("").map(Number);
  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  
  const sum = digits.slice(0, 10).reduce((acc, digit, index) => {
    return acc + digit * multipliers[index];
  }, 0);
  
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? remainder : 11 - remainder;
  
  return checkDigit === digits[10];
};

export const validateRequired = (value: any): string | null => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "Este campo es requerido";
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number): string | null => {
  if (value && value.length < minLength) {
    return `Debe tener al menos ${minLength} caracteres`;
  }
  return null;
};

export const validatePrice = (price: string | number): string | null => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice) || numPrice < 0) {
    return "Debe ser un precio válido";
  }
  return null;
};