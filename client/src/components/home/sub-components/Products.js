import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router";

function Products() {
  const history = useHistory();
  return (
    <section id="products" className="home-products">
      <div
        className="headphones box"
        onClick={() => history.push("/categories/headphones")}
      >
        <div className="headphone img" />
        <h5>HEADPHONES</h5>
        <div className="shop">
          <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
        </div>
      </div>
      <div
        className="speakers box"
        onClick={() => history.push("/categories/speakers")}
      >
        <div className="speaker img" />
        <h5>SPEAKERS</h5>
        <div className="shop">
          <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
        </div>
      </div>
      <div
        className="earphones box"
        onClick={() => history.push("/categories/earphones")}
      >
        <div className="earphone img" />
        <h5>EARPHONES</h5>
        <div className="shop">
          <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
        </div>
      </div>
    </section>
  );
}

export default Products;
