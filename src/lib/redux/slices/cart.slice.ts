import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
  total: number;
  quantity: number;
  isCheckingOut: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  quantity: 0,
  isCheckingOut: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.course_id === action.payload.course_id);
      
      if (!existingItem) {
        state.items.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item.course_id === action.payload);
      
      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        state.total -= item.price;
        state.quantity -= 1;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.quantity = 0;
    },
    setCheckingOut: (state, action: PayloadAction<boolean>) => {
      state.isCheckingOut = action.payload;
    },
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.quantity = action.payload.length;
      state.total = action.payload.reduce((sum, item) => sum + item.price, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCheckingOut,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
