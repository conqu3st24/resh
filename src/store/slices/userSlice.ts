/**
 * Redux slice для управления пользователем
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';

// Интерфейс пользователя
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

// Интерфейс состояния аутентификации
interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Начало загрузки аутентификации
    loginStart: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    
    // Успешная аутентификация
    loginSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    // Ошибка аутентификации
    loginFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Выход из системы
    logout: (state: UserState) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    
    // Обновление данных пользователя
    updateUserProfile: (state: UserState, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    
    // Сброс ошибки
    clearError: (state: UserState) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile, clearError } = userSlice.actions;
export default userSlice.reducer;

// Моковые данные для демонстрации функциональности 
// (в реальном приложении здесь будет API-запрос)
export const loginUser = (email: string, password: string): (dispatch: AppDispatch) => Promise<boolean> => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      dispatch(loginStart());
      
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверка учетных данных (в реальном приложении будет API-запрос)
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: 1,
          name: 'Демо Пользователь',
          email: 'demo@example.com',
          phone: '+7 (999) 123-45-67',
          avatar: 'https://i.pravatar.cc/150?img=8'
        };
        dispatch(loginSuccess(user));
        return true;
      } else {
        dispatch(loginFailure('Неверный email или пароль'));
        return false;
      }
    } catch (error) {
      dispatch(loginFailure('Произошла ошибка при входе'));
      return false;
    }
  };
};

// Регистрация пользователя (мок)
export const registerUser = (name: string, email: string, password: string): (dispatch: AppDispatch) => Promise<boolean> => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      dispatch(loginStart());
      
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном приложении здесь будет запрос к API
      const user: User = {
        id: Date.now(),
        name,
        email,
        avatar: 'https://i.pravatar.cc/150?img=8'
      };
      
      dispatch(loginSuccess(user));
      return true;
    } catch (error) {
      dispatch(loginFailure('Произошла ошибка при регистрации'));
      return false;
    }
  };
}; 