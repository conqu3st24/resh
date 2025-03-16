/**
 * Format price to Russian ruble format
 * @param price - The price to format
 * @returns Formatted price string with ₽ symbol
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format date to Russian format DD.MM.YYYY
 * @param dateString - ISO date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('ru-RU');
};

/**
 * Truncate text to a specified length and add ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}; 