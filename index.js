const express = require("express");
const cors = require("cors");
require("./config/passport");
const app = express();
const apiRouter = require("./routers/routers");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const origin = {
  origin: isProduction ? process.env.CORS_ORIGIN : "http://localhost:3000",
  credentials: true,
};

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(origin));
app.options("*", cors(origin));
app.use(express.json());

app.use(morgan("tiny"));
if (isProduction)
  app.use(express.static(path.resolve(__dirname, "client/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use(passport.initialize());
app.use(apiRouter);

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
