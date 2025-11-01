export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(dateObj);
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
  
  if (match) {
    return `+54 ${match[1]} ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};