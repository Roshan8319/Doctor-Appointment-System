import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  cart: []  
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,  
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.cart.push(product);
    },
    removeFromCart: (state, action) => {
        console.log(action.payload);
      state.cart = state.cart.filter(cartItem => cartItem.medicine_id !== action.payload);
      console.log(state.cart);
       
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;  
