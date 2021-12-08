import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
  },
  reducers: {
    addOrUpdateCart: (state, action) => {
      const index = state.carts.findIndex((e) => e.id === action.payload.id);
      index === -1
        ? state.carts.push(action.payload)
        : (state.carts[index] = action.payload);
    },
    incrementQuantity: (state, action) => {
      state.carts[action.payload.id].quantity += action.payload.quantity;
    },
    decrementQuantity: (state, action) => {
      state.carts[action.payload.id].quantity -= action.payload.quantity;
    },
    emptyTheCart: (state) => {
      state.carts.length = 0;
    },
  },
});

export const {
  addOrUpdateCart,
  emptyTheCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
