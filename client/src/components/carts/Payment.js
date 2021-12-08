import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { openOrCloseCheckoutModal } from "../../app-redux/features/Dialogs";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

function Payment({ classes, theme }) {
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const cartsArr = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();

  const getTotalPriceFromCarts = () =>
    cartsArr
      .map(({ price, quantity }) => price * quantity)
      .reduce((a, b) => a + b, 0);

  const userState = useSelector((state) => state.user.user);
  const [users, setUsers] = useState({
    userId: userState?.id,
    name: userState?.name,
    email: userState?.email,
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    total: getTotalPriceFromCarts() + 50,
  });

  const handleChange = (event) => {
    setComplete(event.complete);
    event.error && toastifyError(event.error.message);
  };

  const openModal = () => {
    dispatch(openOrCloseCheckoutModal(true));
    window.scrollTo(0, 0);
  };

  const { name, email, phone, address, zipCode, city, country } = users;
  const handleChangeField = (name) => (e) => {
    setUsers({ ...users, [name]: e.target.value });
  };
  const toastifyError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
    });
  };
  const toastifySucces = (success) => {
    toast.success(success, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
    });
  };

  const toastifyInfo = () => {
    setTimeout(() => {
      toast.info(
        "Please note that this is just a Demo site, so don't expect an email from us.",
        {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        }
      );
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`/payments/step-one`, users)
      .then(async (responseStepOne) => {
        const { client_secret } = responseStepOne.data;

        await stripe
          .confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          })
          .then(({ paymentIntent }) => {
            axios
              .post("/payments/step-two", {
                id: paymentIntent.id,
                date: paymentIntent.created,
                status: paymentIntent.status,
              })
              .then(() => {
                axios
                  .post("/payments/step-three", {
                    stripeId: paymentIntent.id,
                    products: cartsArr,
                  })
                  .then((responseStepThree) => {
                    setProcessing(false);
                    toastifySucces("Thank you for shopping with us!");
                    openModal();
                    toastifyInfo();
                  });
              })
              .catch((error) => {
                toastifyError(error.response.data);
              });
          })
          .catch((error) => {
            toastifyError(error.response.data);
          });
      })
      .catch((error) => {
        toastifyError(error.response.data);
      });
  };

  return (
    <div className="payment">
      <ThemeProvider theme={theme}>
        <h6 onClick={() => openModal()}>BILLING DETAILS</h6>
        <form id="checkout_form" onSubmit={handleSubmit}>
          <div className="billings flex">
            <TextField
              className={`${classes} a`}
              label="Name"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("name")}
              value={name}
              type="text"
              required
            />
            <TextField
              className={`${classes} b`}
              label="Email Address"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("email")}
              value={email}
              type="email"
              required
            />

            <TextField
              className={`${classes} c`}
              label="Phone Number"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("phone")}
              value={phone}
              type="phone"
              required
            />
          </div>
          <h6>SHIPPING INFO</h6>
          <div className="shipping">
            <TextField
              className={`${classes} a`}
              label="Your Address"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("address")}
              value={address}
              type="address"
              required
            />
            <TextField
              className={`${classes} b`}
              label="Zip Code"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("zipCode")}
              value={zipCode}
              type="text"
              required
            />
            <TextField
              className={`${classes} c`}
              label="City"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("city")}
              value={city}
              type="text"
              required
            />
            <TextField
              className={`${classes} d`}
              label="Country"
              variant="outlined"
              id="country"
              onChange={handleChangeField("country")}
              value={country}
              type="text"
              required
            />
          </div>
          <h6>PAYMENT DETAILS</h6>
          <CardElement onChange={handleChange} />
          <LoadingButton
            loading={processing}
            disabled={processing || !complete || !cartsArr.length}
            className="button"
            type="submit"
          >
            {cartsArr.length ? "CONTINUE & PAY" : "Your Cart is Empty!"}
          </LoadingButton>
        </form>
      </ThemeProvider>
    </div>
  );
}

export default Payment;
