const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")[1]
      : null;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err) => {
      if (err) {
        return err.name === "TokenExpiredError"
          ? res
              .status(403)
              .send("Your session has expired. Please log in again.")
          : res.status(403).send("Invalid Token.");
      }
      return next();
    });
  } catch (err) {
    return res.sendStatus(500);
  }
};
