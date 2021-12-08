import React from "react";
import { useSelector } from "react-redux";
import Carts from "../../home/dialogs/Carts";
import Menu from "../../home/dialogs/Menu";
import Header from "../Headphones/sub-components/Header";
import ProductsHome from "../Headphones/sub-components/Products";
import Products from "../../home/sub-components/Products";
import Description from "../../home/sub-components/Description";
import Footer from "../../home/sub-components/Footer";

import {
  increaseQuantityzx7,
  decreaseQuantityzx7,
} from "../../../app-redux/features/Products";
import { Redirect } from "react-router-dom";

function ZX7() {
  const { speakers } = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="products_zx7">
      <Header />
      <Menu />
      <Carts />
      <ProductsHome
        whichQuantityToDecrease={decreaseQuantityzx7}
        whichQuantityToIncrease={increaseQuantityzx7}
        whichState={speakers.zx7}
      />
      <Products />
      <Description />
      <Footer />
      <Redirect to={user ? "/products/speakers/zx7" : "/register"} />
    </div>
  );
}

export default ZX7;
