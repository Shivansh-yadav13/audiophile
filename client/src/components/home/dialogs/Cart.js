import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../../app-redux/features/Carts";

function Cart({ id, name, price, image, quantity }) {
  const cartsArr = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();

  const quantityValue = () => {
    const index = cartsArr.findIndex((cart) => cart.id === id);
    if (index !== -1) {
      const qtyVal = cartsArr[index].quantity;
      return qtyVal;
    }
  };

  const incrementQty = () => {
    const index = cartsArr.findIndex((cart) => cart.id === id);
    if (index !== -1) dispatch(incrementQuantity({ id: index, quantity: 1 }));
  };

  const decrementQty = () => {
    const index = cartsArr.findIndex((cart) => cart.id === id);
    if (index !== -1) dispatch(decrementQuantity({ id: index, quantity: 1 }));
  };

  return (
    <div className="cart">
      <div className="left">
        <img src={image} alt="" />
      </div>
      <div className="middle">
        <h4>{name}</h4>
        <p>$ {price}</p>
      </div>
      <div className="right">
        <button onClick={decrementQty} disabled={quantityValue() <= 1}>
          -
        </button>
        <div className="screen">
          <h6>{quantity}</h6>
        </div>
        <button onClick={incrementQty} disabled={quantityValue() >= 20}>
          +
        </button>
      </div>
    </div>
  );
}

export default Cart;
