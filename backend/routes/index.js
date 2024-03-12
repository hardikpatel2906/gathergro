const express = require("express");
const route = express.Router();
module.exports = route;
const {
  userLogin,
  userRegistration,
  userProfileUpdate,
  userChangePassword,
} = require("../controllers/userController");

const { createProduct, listProducts, listProductsByUser, upload, deleteProduct } = require("../controllers/productController");
const { createCategory, listCategories } = require("../controllers/categoryController");

/* --- || User Routes || --- */
route.post("/login", userLogin);
route.post("/register", userRegistration);
route.put("/profileupdate", userProfileUpdate);
route.put("/changepassword", userChangePassword);


/** ----- || Product Routes || ----- */
route.post("/api/createProduct", upload.single("products"), createProduct);
route.get("/api/listProducts", listProducts)
route.get("/api/listProductsByUser", listProductsByUser)
route.delete("/api/deleteProduct", deleteProduct);

/** ----- || Category Routes || ----- */
route.post("/api/createCategory", createCategory);
route.get("/api/listCategory", listCategories)

module.exports = route;