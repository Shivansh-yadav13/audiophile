import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

function Summary() {
  const cartsArr = useSelector((state) => state.carts.carts);
  const isModalOpen = useSelector((state) => state.dialogs.isCheckoutModalOpen);

  const getTotal = () =>
    cartsArr
      .map(({ price, quantity }) => price * quantity)
      .reduce((a, b) => a + b, 0);

  const getVatFromTotal = () =>
    Math.round(
      cartsArr
        .map(({ price, quantity }) => price * quantity)
        .reduce((a, b) => a + b, 0) * 0.2
    ).toLocaleString();

  useEffect(() => {
    isModalOpen ? disableBodyScroll(document) : enableBodyScroll(document);
  }, [isModalOpen]);

  return (
    <div className="summary">
      <h2>SUMMARY</h2>
      <div className="list-carts">
        {cartsArr.map(({ id, name, price, image, quantity }) => (
          <div className="list-cart" key={id}>
            <div className="flex">
              <img src={image} alt="" />
              <div className="middle">
                <h4>{name}</h4>
                <p> ${price.toLocaleString()}</p>
              </div>
            </div>
            <h6>x{quantity}</h6>
          </div>
        ))}
      </div>
      <div className="details">
        <div className="total same">
          <p>TOTAL</p>
          <h4>${getTotal().toLocaleString()}</h4>
        </div>
        <div className="shipping same">
          <p>SHIPPING</p>
          <h4>$50</h4>
        </div>
        <div className="vat same">
          <p>VAT (INCLUDED)</p>
          <h4>${getVatFromTotal()}</h4>
        </div>
        <div className="grand-total same">
          <p>GRAND TOTAL</p>
          <h4>${(getTotal() + 50).toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
}

export default Summary;
