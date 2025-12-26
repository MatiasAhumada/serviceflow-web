/**
 * Formateadores centralizados para la aplicación
 */

const LOCALE = 'es-AR';

export const formatters = {
  /**
   * Formatea un número como moneda
   */
  currency: (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `$${num.toLocaleString(LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  /**
   * Formatea una fecha a formato corto (dd/mm/yyyy)
   */
  date: (value: Date | string): string => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleDateString(LOCALE);
  },

  /**
   * Formatea una fecha con hora (dd/mm/yyyy hh:mm)
   */
  datetime: (value: Date | string): string => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return `${date.toLocaleDateString(LOCALE)} ${date.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' })}`;
  },

  /**
   * Formatea solo la hora (hh:mm)
   */
  time: (value: Date | string): string => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });
  },

  /**
   * Formatea un número con separadores de miles
   */
  number: (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toLocaleString(LOCALE);
  },

  /**
   * Formatea un porcentaje
   */
  percentage: (value: number): string => {
    return `${value}%`;
  },
};
