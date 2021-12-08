import React from "react";
import { ReactComponent as CartIcon } from "../../../../assets/cartLogo.svg";
import {
  openOrCloseCart,
  openOrCloseMenu,
} from "../../../../app-redux/features/Dialogs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function Header({ title }) {
  const isMenuOpen = useSelector((state) => state.dialogs.isMenuOpen);
  const isCartOpen = useSelector((state) => state.dialogs.isCartOpen);
  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <div className="headphones-header">
      <div className="container">
        <div className={`contents`}>
          <div className="left">
            <ul
              className="hide-for-desktop"
              onClick={() => dispatch(openOrCloseMenu(!isMenuOpen))}
            >
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <h1 onClick={() => history.push("/")}>audiophile</h1>
          </div>
          <div className="middle hide-for-tablet">
            <ul>
              <li onClick={() => history.push("/")}>HOME</li>
              <li onClick={() => history.push("/categories/headphones")}>
                HEADPHONES
              </li>
              <li onClick={() => history.push("/categories/speakers")}>
                SPEAKERS
              </li>
              <li onClick={() => history.push("/categories/earphones")}>
                EARPHONES
              </li>
            </ul>
          </div>
          <div
            onClick={() => dispatch(openOrCloseCart(!isCartOpen))}
            className="right"
          >
            <CartIcon className="icon" />
          </div>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
