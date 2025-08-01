import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';

export interface Order {
  id: number;
  name: string;
  address: string;
  phone: string;
  items: CartItem[];
  total: number;
  date: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
