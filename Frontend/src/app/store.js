


import { configureStore } from '@reduxjs/toolkit';
import cartReducers from '../Features/cartSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducers,
  },
  devTools: process.env.NODE_ENV !== 'production',
});





