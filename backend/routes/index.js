const express = require("express");
const route = express.Router();
const { userLogin, userRegistration } = require("../controllers/userController");

/* --- || User Routes || --- */
route.post("/login", userLogin);
route.post("/register", userRegistration);

module.exports = route;