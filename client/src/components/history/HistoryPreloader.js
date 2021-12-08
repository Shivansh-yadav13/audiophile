import React from "react";
import Skeleton from "@mui/material/Skeleton";

function HistoryPreloader() {
  return (
    <div className="loader">
      <div className="loader-header">
        <div className="left">
          <Skeleton className="id" />
          <Skeleton className="date" />
        </div>
        <div className="right">
          <Skeleton className="payment" />
          <Skeleton className="status" />
        </div>
      </div>
      <div className="loader-body">
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-details">
          <div className="loader-total">
            <Skeleton className="loader-total-a" />
            <Skeleton className="loader-total-b" />
          </div>
          <div className="loader-shipping">
            <Skeleton className="loader-shipping-a" />
            <Skeleton className="loader-shipping-b" />
          </div>
          <div className="loader-vat">
            <Skeleton className="loader-vat-a" />
            <Skeleton className="loader-vat-b" />
          </div>
          <div className="loader-total-paid">
            <Skeleton className="loader-total-paid-a" />
            <Skeleton className="loader-total-paid-b" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPreloader;
