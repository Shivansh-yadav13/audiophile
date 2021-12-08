import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openOrCloseCart } from "../../../app-redux/features/Dialogs";
import Cart from "./Cart";
import { emptyTheCart } from "../../../app-redux/features/Carts";
import { useHistory } from "react-router";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useReactSimpleMatchMedia from "react-simple-matchmedia";
import HistoryIcon from "@mui/icons-material/History";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../../app-redux/features/User";

function Carts() {
  const isCartOpen = useSelector((state) => state.dialogs.isCartOpen);
  const cartsArr = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();
  const history = useHistory();

  const getTotal = () => {
    const priceArr = cartsArr.map(({ price, quantity }) => price * quantity);
    return priceArr.reduce((a, b) => a + b, 0);
  };

  const handleActivity = () => {
    history.push("/checkout");
    dispatch(openOrCloseCart(false));
  };

  const queryMedia = useReactSimpleMatchMedia;
  // const queryMedia = (media) => matched(media);

  if (queryMedia("(max-width: 40em)"))
    isCartOpen ? disableBodyScroll(document) : enableBodyScroll(document);
  else enableBodyScroll(document);

  const handleHistory = () => {
    history.push("/history");
    dispatch(openOrCloseCart(false));
  };

  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <div
        onClick={() => dispatch(openOrCloseCart(false))}
        className={`cart-fade ${isCartOpen ? "fadeIn" : "fadeOut"}`}
      />
      <div
        onClick={() => dispatch(openOrCloseCart(false))}
        className={`home-carts ${isCartOpen ? "open" : "close"}`}
      >
        <div className="container" onClick={(event) => event.stopPropagation()}>
          <header>
            <h4>CART ({cartsArr.length})</h4>
            <div className="carts-icons">
              <HistoryIcon onClick={() => handleHistory()} />

              <ClearAllIcon onClick={() => dispatch(emptyTheCart())} />
              <ExitToAppIcon onClick={() => setConfirm(!confirm)} />
              {confirm && (
                <div className="cart-confirm">
                  <p>Confirm logout?</p>
                  <div className="buttons">
                    <button onClick={() => setConfirm(false)}>NO</button>
                    <button onClick={() => dispatch(logout())}>YES</button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="carts">
            {cartsArr.length ? (
              cartsArr.map(({ id, image, name, price, quantity }) => (
                <Cart
                  key={id}
                  id={id}
                  image={image}
                  name={name}
                  price={price.toLocaleString()}
                  quantity={quantity}
                />
              ))
            ) : (
              <div className="title">
                <p>Your cart is empty</p>
              </div>
            )}
          </div>
          <div className="totals">
            <p>TOTAL</p>
            <h4>${getTotal().toLocaleString()}</h4>
          </div>
          <div className="checkout">
            <button onClick={handleActivity}>CHECKOUT</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carts;
