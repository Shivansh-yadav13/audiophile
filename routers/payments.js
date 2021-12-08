const pool = require("../database/db");
const express = require("express");

const auth = require("../authentication/auth");
const paymentRouter = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const jwt = require("jsonwebtoken");

paymentRouter.post("/step-one", auth, async (req, res) => {
  try {
    const { total } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
    });

    const { id, client_secret, amount, created } = paymentIntent;

    res.send({ id, client_secret, amount, created });
  } catch (error) {
    res.status(404).send(error);
    throw new Error(error);
  }
});

paymentRouter.post("/step-two", auth, async (req, res) => {
  const { id, date, status } = req.body;
  const token = req.headers["authorization"].split(" ")[1];
  const userId = jwt.verify(token, process.env.SECRET_TOKEN_KEY).id;
  if (userId) {
    await pool
      .query(
        "INSERT INTO history_purchase (stripe_id, date_purchase, user_id, status) VALUES ($1,$2,$3,$4)",
        [id, date, userId, status]
      )
      .then((response) => {
        if (response.command === "INSERT") return res.sendStatus(200);
        return res.sendStatus(412);
      });
  }
});

paymentRouter.post("/step-three", auth, async (req, res) => {
  try {
    const { stripeId, products } = req.body;

    products.map(async ({ name, price, quantity, image }) => {
      await pool.query(
        "INSERT INTO history_product (product_name, product_quantity, product_price, product_id, product_image) VALUES ($1,$2,$3,$4,$5)",
        [name, quantity, price, stripeId, image]
      );
    });
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = paymentRouter;
