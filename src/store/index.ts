import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import playerReducer from './slices/playerSlice';
import favoriteReducer from './slices/favoriteSlice';
import orderReducer from './slices/orderSlice';

// Конфигурация Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
    players: playerReducer,
    favorite: favoriteReducer,
    order: orderReducer
  },
  // Отключаем проверку сериализуемости в неprod среде для упрощения разработки
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV !== 'production',
    }),
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;