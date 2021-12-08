import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import moment from "moment";

function History({ id, date, status, products }) {
  const isModalOpen = useSelector((state) => state.dialogs.isCheckoutModalOpen);

  useEffect(() => {
    isModalOpen ? disableBodyScroll(document) : enableBodyScroll(document);
  }, [isModalOpen]);

  const getTotal = () =>
    products
      .map(
        ({ product_price, product_quantity }) =>
          product_price * product_quantity
      )
      .reduce((a, b) => a + b, 0);

  const getVatFromTotal = () =>
    Math.round(
      products
        .map(
          ({ product_price, product_quantity }) =>
            product_price * product_quantity
        )
        .reduce((a, b) => a + b, 0) * 0.02
    );

  return (
    <div className="history">
      <div className="history-header">
        <h4>Id: {id}</h4>
        <h5>Date: {moment.unix(date).format("MMM Do LT")} </h5>
      </div>
      <div className="history-header">
        <p>Payment Status</p>
        <p className={`status ${status === "succeeded"}`}>{status}</p>
      </div>
      <div className="history-carts">
        {products.map(
          (
            { product_name, product_price, product_image, product_quantity },
            id
          ) => (
            <div className="history-cart" key={id}>
              <div className="flex">
                <img src={product_image} alt="" />
                <div className="middle">
                  <h4>{product_name}</h4>
                  <p> ${product_price.toLocaleString()}</p>
                </div>
              </div>
              <h6>x{product_quantity}</h6>
            </div>
          )
        )}
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
          <h4>${getVatFromTotal().toLocaleString()}</h4>
        </div>
        <div className="grand-total same">
          <p>TOTAL PAID</p>
          <h4>$ {(getTotal() + getVatFromTotal() + 50).toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
}

export default History;
