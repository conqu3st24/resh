/**
 * Интерфейсы и типы для работы с продуктами
 */

// Опция цвета для продукта
export interface ColorOption {
  id: number | string;
  name: string;
  hex: string;
}

// Опция переключателя для клавиатуры
export interface SwitchOption {
  id: string;
  name: string;
  color: string;
}

// Базовый интерфейс продукта
export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  inStock: boolean;
  isPreorder?: boolean;
  category?: string;
  popularity?: number;
  description?: string;
  colors?: ColorOption[];
  switchOptions?: SwitchOption[];
}

// Тип для товара в корзине
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string | number;
  selectedSwitch?: string;
}

// Тип для корзины
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Интерфейс для фильтра продуктов
export interface ProductFilter {
  category?: string;
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  searchQuery?: string;
} 