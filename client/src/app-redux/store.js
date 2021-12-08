import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User";
import dialogReducer from "./features/Dialogs";
import cartReducer from "./features/Carts";
import productReducer from "./features/Products";

export default configureStore({
  reducer: {
    user: userReducer,
    dialogs: dialogReducer,
    carts: cartReducer,
    products: productReducer,
  },
});
