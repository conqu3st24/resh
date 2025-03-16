/**
 * Redux slice для товаров
 */
import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Product, ProductFilter } from '../../types/product';
import { productApi } from '../../api';
import { RootState } from '../../store';

// Начальное состояние
interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  recentlyViewed: Product[];
  comparisonItems: Product[];
  filter: ProductFilter;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  recentlyViewed: [],
  comparisonItems: [],
  filter: {
    category: '',
    brand: '',
    priceRange: {
      min: 0,
      max: 100000
    },
    inStock: true,
    searchQuery: ''
  },
};

// Типы для rejectValue в async thunks
interface ThunkConfig {
  rejectValue: string;
}

// Async thunks для работы с API
export const fetchProducts = createAsyncThunk<Product[], string | undefined, ThunkConfig>(
  'products/fetchProducts',
  async (category: string | undefined = undefined, { rejectWithValue }) => {
    try {
      return await productApi.getProducts(category);
    } catch (error) {
      return rejectWithValue('Не удалось загрузить товары. Попробуйте позже.');
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, string | number, ThunkConfig>(
  'products/fetchProductById',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const product = await productApi.getProductById(id);
      if (product) return product;
      return rejectWithValue('Товар не найден');
    } catch (error) {
      return rejectWithValue('Не удалось загрузить товар. Попробуйте позже.');
    }
  }
);

export const searchProducts = createAsyncThunk<Product[], string, ThunkConfig>(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      return await productApi.searchProducts(query);
    } catch (error) {
      return rejectWithValue('Не удалось выполнить поиск. Попробуйте позже.');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Добавление товара в просмотренные
    addToRecentlyViewed: (state: ProductState, action: PayloadAction<Product>) => {
      const product = action.payload;
      // Удаляем товар, если он уже есть в списке
      state.recentlyViewed = state.recentlyViewed.filter((item: Product) => item.id !== product.id);
      // Добавляем товар в начало списка
      state.recentlyViewed.unshift(product);
      // Ограничиваем список до 6 элементов
      if (state.recentlyViewed.length > 6) {
        state.recentlyViewed.pop();
      }
    },
    
    // Добавление товара в сравнение
    addToComparison: (state: ProductState, action: PayloadAction<Product>) => {
      const product = action.payload;
      // Проверяем, есть ли уже товар в списке сравнения
      const itemExists = state.comparisonItems.some(item => item.id === product.id);
      
      if (!itemExists) {
        // Ограничиваем список сравнения до 4 элементов
        if (state.comparisonItems.length >= 4) {
          state.comparisonItems.pop(); // Удаляем последний элемент
        }
        // Добавляем товар в начало списка
        state.comparisonItems.unshift(product);
      }
    },
    
    // Удаление товара из сравнения
    removeFromComparison: (state: ProductState, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.comparisonItems = state.comparisonItems.filter(item => item.id !== productId);
    },
    
    // Очистка списка сравнения
    clearComparison: (state: ProductState) => {
      state.comparisonItems = [];
    },
    
    // Установка фильтров
    setFilter: (state: ProductState, action: PayloadAction<Partial<ProductFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    
    // Сброс фильтров
    resetFilter: (state: ProductState) => {
      state.filter = {
        category: '',
        brand: '',
        priceRange: {
          min: 0,
          max: 100000
        },
        inStock: true,
        searchQuery: ''
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    // Обработка fetchProducts
    builder
      .addCase(fetchProducts.pending, (state: ProductState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state: ProductState, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state: ProductState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      
      // Обработка fetchProductById
      .addCase(fetchProductById.pending, (state: ProductState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state: ProductState, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
        // Добавляем товар в просмотренные
        if (action.payload) {
          const product = action.payload;
          state.recentlyViewed = state.recentlyViewed.filter((item: Product) => item.id !== product.id);
          state.recentlyViewed.unshift(product);
          if (state.recentlyViewed.length > 6) {
            state.recentlyViewed.pop();
          }
        }
      })
      .addCase(fetchProductById.rejected, (state: ProductState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      
      // Обработка searchProducts
      .addCase(searchProducts.pending, (state: ProductState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state: ProductState, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state: ProductState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const { 
  addToRecentlyViewed, 
  addToComparison, 
  removeFromComparison, 
  clearComparison, 
  setFilter, 
  resetFilter 
} = productSlice.actions;

// Селектор для получения списка товаров в сравнении
export const selectComparisonItems = (state: RootState) => state.products.comparisonItems;

export default productSlice.reducer;