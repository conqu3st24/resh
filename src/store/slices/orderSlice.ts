import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Типы для моковых данных
export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

interface OrderState {
  activeHistoryStep: number;
  showAllItems: boolean;
  orders: Order[];
}

const initialState: OrderState = {
  activeHistoryStep: 0,
  showAllItems: false,
  orders: [
    {
      id: 2430119,
      date: '07.03.2025',
      status: 'processing',
      total: 14000,
      items: [
        {
          id: 1,
          title: 'Logitech G Pro X Superlight Pink',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
        },
        {
          id: 2,
          title: 'Logitech G Pro X Superlight Black',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png'
        }
      ]
    },
    {
      id: 2430118,
      date: '07.03.2025',
      status: 'shipped',
      total: 14000,
      items: [
        {
          id: 4,
          title: 'Logitech G Pro X Superlight Pink',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
        }
      ]
    },
    {
      id: 2430117,
      date: '07.03.2025',
      status: 'cancelled',
      total: 14000,
      items: [
        {
          id: 7,
          title: 'Logitech G Pro X Superlight Pink',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
        }
      ]
    }
  ]
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setActiveHistoryStep: (state, action: PayloadAction<number>) => {
      state.activeHistoryStep = action.payload;
    },
    toggleShowAllItems: (state) => {
      state.showAllItems = !state.showAllItems;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{orderId: number, status: Order['status']}>) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
    }
  },
});

export const { 
  setActiveHistoryStep, 
  toggleShowAllItems,
  addOrder,
  updateOrderStatus
} = orderSlice.actions;

export default orderSlice.reducer;
