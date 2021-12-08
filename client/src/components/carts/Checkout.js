import React, { useState } from "react";
import Header from "../products/Headphones/sub-components/Header";
import Carts from "../home/dialogs/Carts";
import Menu from "../home/dialogs/Menu";
import Summary from "./Summary";
import Footer from "../home/sub-components/Footer";
import {
  createStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Modal from "./Modal";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      background: 500,
    },
    margin: {
      margin: theme.spacing(0),
    },
  })
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d87d4a",
    },
  },
});

function Checkout() {
  const classes = useStyles();
  const history = useHistory();

  const [stripePromise] = useState(() =>
    loadStripe(
      "pk_test_51I9m6jIIzjjTQI3tlzeqnfMb4TtFerGdacTn1afS9UxPZObGopye5u53kYB8E1wDnixxJ8DmoqUbNhysoeoNkXtp00sMYCrjkQ"
    )
  );

  const user = useSelector((state) => state.user.user);
  return (
    <div className="checkout">
      <Header />
      <Carts />
      <Menu />
      <div className="checkout_home">
        <Modal />
        <div className="container">
          <div className="max-width">
            <p onClick={() => history.goBack()} className="goBack">
              Go Back
            </p>
          </div>
          <div className="flex-item">
            <Summary />
            <div className="allDetails">
              <div className="info">
                <h2>CHECKOUT</h2>
                <Elements stripe={stripePromise}>
                  <Payment classes={classes} theme={theme} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Redirect to={user ? "/checkout" : "/register"} />
    </div>
  );
}

export default Checkout;
