import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../helper/categories";
import { products } from "../helper/products";

export const productSlice = createSlice({
  name: "carts",
  initialState: {
    categories: { ...categories },
    products: { ...products },
  },
  reducers: {
    //headphones
    increaseQuantityxx99MarkII: (state) => {
      if (state.products.headphones.xx99MarkII[0].carts.quantity < 20)
        state.products.headphones.xx99MarkII[0].carts.quantity += 1;
    },
    decreaseQuantityxx99MarkII: (state) => {
      if (state.products.headphones.xx99MarkII[0].carts.quantity > 1)
        state.products.headphones.xx99MarkII[0].carts.quantity -= 1;
    },
    increaseQuantityxx99MarkI: (state) => {
      if (state.products.headphones.xx99MarkI[0].carts.quantity < 20)
        state.products.headphones.xx99MarkI[0].carts.quantity += 1;
    },
    decreaseQuantityxx99MarkI: (state) => {
      if (state.products.headphones.xx99MarkI[0].carts.quantity > 1)
        state.products.headphones.xx99MarkI[0].carts.quantity -= 1;
    },
    increaseQuantityxx59: (state) => {
      if (state.products.headphones.xx59[0].carts.quantity < 20)
        state.products.headphones.xx59[0].carts.quantity += 1;
    },
    decreaseQuantityxx59: (state) => {
      if (state.products.headphones.xx59[0].carts.quantity > 1)
        state.products.headphones.xx59[0].carts.quantity -= 1;
    },
    //Speakers
    increaseQuantityzx9: (state) => {
      if (state.products.speakers.zx9[0].carts.quantity < 20)
        state.products.speakers.zx9[0].carts.quantity += 1;
    },
    decreaseQuantityzx9: (state) => {
      if (state.products.speakers.zx9[0].carts.quantity > 1)
        state.products.speakers.zx9[0].carts.quantity -= 1;
    },
    increaseQuantityzx7: (state) => {
      if (state.products.speakers.zx7[0].carts.quantity < 20)
        state.products.speakers.zx7[0].carts.quantity += 1;
    },
    decreaseQuantityzx7: (state) => {
      if (state.products.speakers.zx7[0].carts.quantity > 1)
        state.products.speakers.zx7[0].carts.quantity -= 1;
    },
    //earphones
    increaseQuantityyx1: (state) => {
      if (state.products.earphones.yx1[0].carts.quantity < 20)
        state.products.earphones.yx1[0].carts.quantity += 1;
    },
    decreaseQuantityyx1: (state) => {
      if (state.products.earphones.yx1[0].carts.quantity > 1)
        state.products.earphones.yx1[0].carts.quantity -= 1;
    },
  },
});

export const {
  //headphones
  increaseQuantityxx99MarkII,
  decreaseQuantityxx99MarkII,
  increaseQuantityxx99MarkI,
  decreaseQuantityxx99MarkI,
  increaseQuantityxx59,
  decreaseQuantityxx59,
  //speakers
  increaseQuantityzx9,
  decreaseQuantityzx9,
  increaseQuantityzx7,
  decreaseQuantityzx7,
  //earphones
  increaseQuantityyx1,
  decreaseQuantityyx1,
} = productSlice.actions;

export default productSlice.reducer;
