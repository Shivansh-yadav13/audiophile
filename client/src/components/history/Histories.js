import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import History from "./History";
import Header from "../products/Headphones/sub-components/Header";
import Footer from "../home/sub-components/Footer";
import Carts from "../home/dialogs/Carts";
import Menu from "../home/dialogs/Menu";
import { ReactComponent as TruckDelivery } from "../../assets/truckDelivery.svg";
import { ReactComponent as DeliveryLogo } from "../../assets/deliveryLogo.svg";
import Button from "@mui/material/Button";
import axios from "axios";
import HistoryPreloader from "./HistoryPreloader";

function Histories() {
  const userState = useSelector((state) => state.user.user);
  const [orderHistory, SetorderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchOrderHistory = () => {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common = {
        ...axios.defaults.headers.common,
        Authorization: `Bearer ${token}`,
      };
      axios
        // https://audiophile-e-commerce.herokuapp.com
        // http://localhost:5010
        .get("https://audiophile24.herokuapp.com/history/all", {
          method: "GET",
          cancelToken: source.token,
        })
        .then((response) => {
          SetorderHistory(response.data);
          setIsLoading(false);
        });
    };
    fetchOrderHistory();
    return () => {
      source.cancel();
    };
  }, []);

  const handleActivity = () => {
    if (isLoading)
      return (
        <>
          <HistoryPreloader />
          <HistoryPreloader />
        </>
      );

    return orderHistory.length ? (
      orderHistory.map(
        ({ stripe_id, date_purchase, status, products }, index) => (
          <History
            key={index}
            id={stripe_id}
            date={date_purchase}
            status={status}
            products={products}
          />
        )
      )
    ) : (
      <div className="no-record">
        <div className="container">
          <h1>You have no order in progress!</h1>
          <h3>All your orders will be saved here for you.</h3>
          <div className="logo">
            <TruckDelivery />
            <DeliveryLogo />
          </div>
          <Button
            onClick={() =>
              setTimeout(() => history.push("categories/headphones"), 300)
            }
          >
            Click here to start buying products
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="histories">
      <Header />
      <Menu />
      <Carts />
      <div className="histories-container">
        <div className="histories-contents">
          <h1>Order History</h1>
          {handleActivity()}
        </div>
      </div>
      <Footer />
      <Redirect to={userState ? "/history" : "/"} />
    </div>
  );
}

export default Histories;
