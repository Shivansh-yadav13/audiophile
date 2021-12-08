import React from "react";
// import { useDispatch } from "react-redux";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { openOrCloseMenu } from "../../../app-redux/features/Dialogs";
import { useHistory } from "react-router";

function Menu() {
  const isMenuOpen = useSelector((state) => state.dialogs.isMenuOpen);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div
      onClick={() => dispatch(openOrCloseMenu(false))}
      className={`menu ${isMenuOpen ? "open" : "close"} hide-for-desktop`}
    >
      <div className="contents" onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div
            className="headphones box"
            onClick={() => {
              history.push("/categories/headphones");
              dispatch(openOrCloseMenu(false));
            }}
          >
            <div className="headphone img" />
            <h5>HEADPHONES</h5>
            <div className="shop">
              <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
            </div>
          </div>
          <div
            className="speakers box"
            onClick={() => {
              history.push("/categories/speakers");
              dispatch(openOrCloseMenu(false));
            }}
          >
            <div className="speaker img" />
            <h5>SPEAKERS</h5>
            <div className="shop">
              <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
            </div>
          </div>
          <div
            className="earphones box"
            onClick={() => {
              history.push("/categories/earphones");
              dispatch(openOrCloseMenu(false));
            }}
          >
            <div className="earphone img" />
            <h5>EARPHONES</h5>
            <div className="shop">
              <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
