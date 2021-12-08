const tokenRoute = require("express").Router();

const auth = require("../authentication/auth");
const { token } = require("../controllers/controllers");

tokenRoute.post("/", auth, token);

module.exports = tokenRoute;
