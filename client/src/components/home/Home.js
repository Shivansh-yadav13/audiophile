import React from "react";

//import components
import Header from "./sub-components/Header";
import Banner from "./sub-components/Banner";
import Products from "./sub-components/Products";
import Footer from "./sub-components/Footer";
import Galleries from "./sub-components/Galleries";
import Description from "./sub-components/Description";
//import dialogs
import Menu from "./dialogs/Menu";
import Carts from "./dialogs/Carts";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="home">
      <Header />
      <Menu />
      <Carts />
      <Banner />
      <Products />
      <Galleries />
      <Description />
      <Footer />
      <Redirect to={user ? "/" : "/register"} />
    </div>
  );
}

export default Home;
