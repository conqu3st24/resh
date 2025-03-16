/**
 * API Layer for interacting with backend services
 */

import { Product } from '../types/product';
import { ApiError, handleApiError } from '../utils/errorHandling';

// Базовый URL API - в реальном проекте должен указывать на рабочий бэкенд
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Функция для выполнения fetch-запросов
 * @param url - URL точки API
 * @param options - Опции fetch запроса
 * @returns Promise с ответом
 */
const fetchApi = async (url: string, options: RequestInit = {}): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Проверяем успешность запроса
    if (!response.ok) {
      throw new ApiError(`API вернул ошибку: ${response.statusText}`, response.status);
    }

    // Парсим JSON-ответ
    const data = await response.json();
    return data;
  } catch (error) {
    // Используем централизованную обработку ошибок
    throw error;
  }
};

/**
 * API для работы с продуктами
 */
export const productApi = {
  // Получить все продукты или отфильтрованный список
  getProducts: async (category?: string): Promise<Product[]> => {
    try {
      const url = category ? `/products?category=${category}` : '/products';
      return await fetchApi(url);
    } catch (error) {
      console.error('Error fetching products:', error);
      // В случае ошибки возвращаем пустой массив
      return [];
    }
  },

  // Получить один продукт по ID
  getProductById: async (id: string | number): Promise<Product | null> => {
    try {
      return await fetchApi(`/products/${id}`);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
    }
  },

  // Поиск продуктов
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      return await fetchApi(`/products/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};

/**
 * API для работы с корзиной
 */
export const cartApi = {
  // Получить содержимое корзины
  getCart: async (): Promise<any> => {
    try {
      return await fetchApi('/cart');
    } catch (error) {
      console.error('Error fetching cart:', error);
      return { items: [] };
    }
  },

  // Добавить товар в корзину
  addToCart: async (productId: number, quantity: number = 1): Promise<any> => {
    try {
      return await fetchApi('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  // Удалить товар из корзины
  removeFromCart: async (productId: number): Promise<any> => {
    try {
      return await fetchApi('/cart/remove', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  // Обновить количество товара в корзине
  updateCartItem: async (productId: number, quantity: number): Promise<any> => {
    try {
      return await fetchApi('/cart/update', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }
};

// Другие API модули могут быть добавлены по мере необходимости 