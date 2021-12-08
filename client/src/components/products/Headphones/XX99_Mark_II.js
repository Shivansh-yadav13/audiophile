import React from "react";
import { useSelector } from "react-redux";
import Header from "./sub-components/Header";
import ProductsHome from "./sub-components/Products";
import Footer from "../../home/sub-components/Footer";
import Description from "../../home/sub-components/Description";
import Products from "../../home/sub-components/Products";
import Carts from "../../home/dialogs/Carts";
import Menu from "../../home/dialogs/Menu";
import {
  decreaseQuantityxx99MarkII,
  increaseQuantityxx99MarkII,
} from "../../../app-redux/features/Products";

import { Redirect } from "react-router-dom";
function XX99_Mark_II() {
  const { headphones } = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="products_xx99_mark_ii">
      <Header />
      <Menu />
      <Carts />
      <ProductsHome
        whichQuantityToDecrease={decreaseQuantityxx99MarkII}
        whichQuantityToIncrease={increaseQuantityxx99MarkII}
        whichState={headphones.xx99MarkII}
      />
      <Products />
      <Description />
      <Footer />
      <Redirect to={user ? "/products/headphones/xx99-mark-ii" : "/register"} />
    </div>
  );
}

export default XX99_Mark_II;
