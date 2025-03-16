/**
 * Redux slice для корзины
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Product } from '../../types/product';

// Начальное состояние корзины
const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Вспомогательная функция для подсчета общего количества и цены
const recalculateCart = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (totals, item) => {
      totals.totalItems += item.quantity;
      totals.totalPrice += item.product.price * item.quantity;
      return totals;
    },
    { totalItems: 0, totalPrice: 0 }
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавление товара в корзину
    addToCart: (state: Cart, action: PayloadAction<{ product: Product; quantity: number; selectedColor?: string | number; selectedSwitch?: string }>) => {
      const { product, quantity, selectedColor, selectedSwitch } = action.payload;
      
      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => 
          item.product.id === product.id && 
          item.selectedColor === selectedColor && 
          item.selectedSwitch === selectedSwitch
      );
      
      if (existingItemIndex >= 0) {
        // Если товар уже есть, увеличиваем количество
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Иначе добавляем новый товар
        state.items.push({
          product,
          quantity,
          selectedColor,
          selectedSwitch,
        });
      }
      
      // Пересчитываем общее количество и цену
      const totals = recalculateCart(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    
    // Удаление товара из корзины
    removeFromCart: (state: Cart, action: PayloadAction<{ itemIndex: number }>) => {
      const { itemIndex } = action.payload;
      
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        state.items.splice(itemIndex, 1);
        
        // Пересчитываем общее количество и цену
        const totals = recalculateCart(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },
    
    // Обновление количества товара
    updateQuantity: (state: Cart, action: PayloadAction<{ itemIndex: number; quantity: number }>) => {
      const { itemIndex, quantity } = action.payload;
      
      if (itemIndex >= 0 && itemIndex < state.items.length && quantity > 0) {
        state.items[itemIndex].quantity = quantity;
        
        // Пересчитываем общее количество и цену
        const totals = recalculateCart(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },
    
    // Очистка корзины
    clearCart: (state: Cart) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 