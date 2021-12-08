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
  decreaseQuantityxx99MarkI,
  increaseQuantityxx99MarkI,
} from "../../../app-redux/features/Products";
import { Redirect } from "react-router-dom";

function XX99_Mark_I() {
  const { headphones } = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="products_xx99_mark_i">
      <Header />
      <Menu />
      <Carts />
      <ProductsHome
        whichQuantityToIncrease={increaseQuantityxx99MarkI}
        whichQuantityToDecrease={decreaseQuantityxx99MarkI}
        whichState={headphones.xx99MarkI}
      />
      <Products />
      <Description />
      <Footer />

      <Redirect to={user ? "/products/headphones/xx99-mark-i" : "/register"} />
    </div>
  );
}

export default XX99_Mark_I;
