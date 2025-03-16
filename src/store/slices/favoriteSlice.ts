import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { RootState } from '..';

// Интерфейс для состояния избранных товаров
interface FavoriteState {
  items: Product[];
}

// Начальное состояние
const initialState: FavoriteState = {
  items: [],
};

// Создание slice для избранных товаров
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // Добавить товар в избранное
    addToFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    // Удалить товар из избранного
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Очистить все избранное
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

// Экспорт экшенов
export const { addToFavorite, removeFromFavorite, clearFavorites } = favoriteSlice.actions;

// Селектор для получения списка избранных товаров
export const selectFavoriteItems = (state: RootState) => state.favorite.items;

// Селектор для проверки, находится ли товар в избранном
export const selectIsFavorite = (state: RootState, productId: number) => 
  state.favorite.items.some(item => item.id === productId);

// Экспорт редьюсера
export default favoriteSlice.reducer;
