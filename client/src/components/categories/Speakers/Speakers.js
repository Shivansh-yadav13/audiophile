import React from "react";
import Header from "../Headphones/sub-components/Header";
import Menu from "../../home/dialogs/Menu";
import Cart from "../../home/dialogs/Carts";
import Details from "../Headphones/sub-components/Details";
import Products from "../../home/sub-components/Products";
import Description from "../../home/sub-components/Description";
import Footer from "../../home/sub-components/Footer";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Speakers() {
  const { speakers } = useSelector((state) => state.products.categories);
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <Header title={"SPEAKERS"} />
      <Menu />
      <Cart />
      <Details noOfGrids={"two"} whichState={speakers} />
      <Products />
      <Description />
      <Footer />
      <Redirect to={user ? "/categories/speakers" : "/register"} />
    </div>
  );
}

export default Speakers;
