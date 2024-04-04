const express = require("express");
const route = express.Router();
module.exports = route;
const {
  userLogin,
  userRegistration,
  userProfileUpdate,
  userChangePassword,
} = require("../controllers/userController");

const {
  createProduct,
  listProducts,
  listProductsByUser,
  upload,
  deleteProduct,
  increaseQuantity,
} = require("../controllers/productController");
const {
  createCategory,
  listCategories,
} = require("../controllers/categoryController");
const {
  createOrder,
  listOrdersByUser,
  ordersByVendor,
  updateOrderStatus,
} = require("../controllers/orderController");

/* --- || User Routes || --- */
route.post("/login", userLogin);
route.post("/register", userRegistration);
route.put("/profileupdate", userProfileUpdate);
route.put("/changepassword", userChangePassword);

/** ----- || Product Routes || ----- */
route.post("/api/createProduct", upload.single("products"), createProduct);
route.get("/api/listProducts", listProducts);
route.get("/api/listProductsByUser", listProductsByUser);
route.delete("/api/deleteProduct", deleteProduct);
route.put("/api/increaseQuantity", increaseQuantity);

/** ----- || Category Routes || ----- */
route.post("/api/createCategory", createCategory);
route.get("/api/listCategory", listCategories);

/** ------- || Order Routes || ------- */
route.post("/api/createOrder", createOrder);
route.get("/api/listOrdersByUser", listOrdersByUser);
route.get("/api/ordersByVendor", ordersByVendor);
route.post("/api/updateOrderStatus", updateOrderStatus);

module.exports = route;
