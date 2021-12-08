import React from "react";
import { ReactComponent as CartIcon } from "../../../../assets/cartLogo.svg";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  openOrCloseCart,
  openOrCloseMenu,
} from "../../../../app-redux/features/Dialogs";

function Header() {
  const history = useHistory();
  const path = (path) => history.push(path);
  const { isMenuOpen } = useSelector((state) => state.dialogs);
  const { isCartOpen } = useSelector((state) => state.dialogs);
  const dispatch = useDispatch();

  return (
    <div className={`products_header`}>
      <div className="container">
        <div className="contents">
          <div className="left">
            <ul
              onClick={() => dispatch(openOrCloseMenu(!isMenuOpen))}
              className="hide-for-desktop"
            >
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <h4 onClick={() => path("/")}>audiophile</h4>
          </div>
          <div className="middle hide-for-tablet">
            <ul>
              <li onClick={() => path("/")}>HOME</li>
              <li onClick={() => path("/categories/headphones")}>HEADPHONES</li>
              <li onClick={() => path("/categories/speakers")}>SPEAKERS</li>
              <li onClick={() => path("/categories/earphones")}>EARPHONES</li>
            </ul>
          </div>
          <div
            onClick={() => dispatch(openOrCloseCart(!isCartOpen))}
            className="right"
          >
            <CartIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
