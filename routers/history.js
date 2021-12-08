const auth = require("../authentication/auth");
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

const historyRoute = require("express").Router();

historyRoute.get("/all", auth, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const userId = jwt.verify(token, process.env.SECRET_TOKEN_KEY).id;
    await pool
      .query(
        "SELECT stripe_id, date_purchase, status FROM history_purchase WHERE user_id=$1 ORDER BY date_purchase DESC;",
        [userId]
      )
      .then(async (responseOne) => {
        new Promise((resolve) => {
          const data = [];
          responseOne.rows.map(async (object) => {
            await pool
              .query(
                "SELECT product_name, product_quantity, product_price, product_image FROM history_product WHERE product_id=$1;",
                [object.stripe_id]
              )
              .then((responseTwo) => {
                object.products = [...responseTwo.rows];
                data.push(object);
              });
          });
          setTimeout(() => resolve(data), 1000);
        }).then((response) => {
          res.send(response);
        });
      });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = historyRoute;
