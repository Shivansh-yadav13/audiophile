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
  increaseQuantityxx59,
  decreaseQuantityxx59,
} from "../../../app-redux/features/Products";
import { Redirect } from "react-router-dom";

function XX59() {
  const { headphones } = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="products_xx59">
      <Header />
      <Menu />
      <Carts />
      <ProductsHome
        whichQuantityToIncrease={increaseQuantityxx59}
        whichQuantityToDecrease={decreaseQuantityxx59}
        whichState={headphones.xx59}
      />
      <Products />
      <Description />
      <Footer />
      <Redirect to={user ? "/products/headphones/xx59" : "/register"} />
    </div>
  );
}

export default XX59;
