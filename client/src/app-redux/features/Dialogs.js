import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isMenuOpen: false,
    isCartOpen: false,
    isCheckoutModalOpen: false,
  },
  reducers: {
    openOrCloseMenu: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    openOrCloseCart: (state, action) => {
      state.isCartOpen = action.payload;
    },
    openOrCloseCheckoutModal: (state, action) => {
      state.isCheckoutModalOpen = action.payload;
    },
  },
});

export const { openOrCloseMenu, openOrCloseCart, openOrCloseCheckoutModal } =
  dialogSlice.actions;

export default dialogSlice.reducer;
