import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addOrUpdateCart } from "../../../../app-redux/features/Carts";
import useReactSimpleMatchMedia from "react-simple-matchmedia";
import { toast } from "react-toastify";
import { openOrCloseCart } from "../../../../app-redux/features/Dialogs";

function Product(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addOrUpdateCart(props.carts));
    toastify();
  };
  const matched = useReactSimpleMatchMedia;
  const queryMedia = (media) => matched(media);

  const toastify = () =>
    toast.info(`Added ${props.name}.`, {
      position: "top-right",
      autoClose: 2500,
      onClick: () => dispatch(openOrCloseCart(true)),
    });

  return (
    <div className="product">
      <div className="positioning">
        <p className="goBack" onClick={() => history.goBack()}>
          Go Back
        </p>
      </div>
      <div className="sectionOne">
        <div className="left ">
          <img src={props.image} alt="" />
        </div>
        <div className="right">
          {props.title && <p className="newProduct">NEW PRODUCT</p>}
          <h4>{props.name}</h4>
          <p className="description">{props.description}</p>
          <h6>$ {props.price.toLocaleString()}</h6>
          <div className="flex">
            <div className="buttons">
              <button onClick={() => dispatch(props.whichQuantityToDecrease())}>
                -
              </button>
              <p>{props.carts.quantity}</p>
              <button onClick={() => dispatch(props.whichQuantityToIncrease())}>
                +
              </button>
            </div>
            <button className="checkoutbtn" onClick={addToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="sectionTwo">
        <div className="grid">
          <h4>FEATURES</h4>
          <p>{props.featuresOne}</p>
          <p>{props.featuresTwo}</p>
        </div>
        <div className="flex">
          <h4>IN THE BOX</h4>
          <div className="boxes">
            {props.box.map(({ id, times, names }) => (
              <div key={id} className="box">
                <h5>{times}x</h5> <p>{names}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sectionThree">
        {props.productsImages.map(({ id, imageM, imageT, imageD }) => {
          let currentImage = imageM;
          if (queryMedia("(min-width: 40em)")) currentImage = imageT;
          if (queryMedia("(min-width: 64em)")) currentImage = imageD;
          return (
            <div key={id} className="image">
              <img src={currentImage} alt="" />
            </div>
          );
        })}
      </div>

      <div className="sectionFour">
        <h4>YOU MAY ALSO LIKE</h4>
        <div className="flex">
          {props.suggestions.map(
            ({ id, imageM, imageT, imageD, name, path }) => {
              let currentImage = imageM;
              if (queryMedia("(min-width: 40em)")) currentImage = imageT;
              if (queryMedia("(min-width: 64em)")) currentImage = imageD;
              return (
                <div key={id} className="suggestions">
                  <img src={currentImage} alt="" />
                  <h4>{name}</h4>
                  <button onClick={() => history.push(path)}>
                    SEE PRODUCT
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
