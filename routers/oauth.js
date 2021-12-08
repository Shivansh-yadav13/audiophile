const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");

const isProduction = process.env.NODE_ENV === "production";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router
  .get(
    "/google/redirect",
    passport.authenticate("google", { session: false }),
    async (req, res, next) => {
      const user = req.user;
      const token = jwt.sign(user, process.env.SECRET_TOKEN_KEY, {
        expiresIn: "12h",
      });

      await pool
        .query("SELECT token FROM temp_token;")
        .then(async (response) => {
          if (!response.rowCount) {
            await pool.query(
              "INSERT INTO temp_token (id, token) VALUES (1, $1)",
              [token]
            );
            return next();
          }
          await pool.query("UPDATE temp_token SET token = $1 WHERE id=1;", [
            token,
          ]);
          return next();
        });
    },
    (req, res) => {
      res
        .status(200)
        .redirect(
          isProduction
            ? process.env.GOOGLE_FRONT_END_REDIRECT_URL
            : "http://localhost:3000/register"
        );
    }
  )
  .get("/credentials", async (req, res) => {
    await pool.query("SELECT token FROM temp_token;").then(async (response) => {
      if (response.rowCount) {
        await pool.query("DELETE FROM temp_token WHERE id=1;");
        const token = response.rows[0].token;
        const user = jwt.verify(token, process.env.SECRET_TOKEN_KEY, {
          expiresIn: "12h",
        });

        return res.status(200).json({ ...user, token });
      }
      return res.status(404).send("");
    });
  });

module.exports = router;
