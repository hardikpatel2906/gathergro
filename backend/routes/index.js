const express = require("express");
const route = express.Router();
module.exports = route;
const {
  userLogin,
  userRegistration,
  userProfileUpdate,
  userChangePassword,
} = require("../controllers/userController");

const { createProduct, listProducts } = require("../controllers/productController");

/* --- || User Routes || --- */
route.post("/login", userLogin);
route.post("/register", userRegistration);
route.put("/profileupdate", userProfileUpdate);
route.put("/changepassword", userChangePassword);


/** ----- || Product Routes || ----- */
route.post("/api/createProduct", createProduct);
route.get("/api/listProducts", listProducts)


module.exports = route;