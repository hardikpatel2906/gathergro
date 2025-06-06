const express = require("express");
const route = express.Router();

const { userLogin, userRegistration, userProfileUpdate, userChangePassword, userProfilePhotoUpdate, getUserById } = require("../controllers/userController");
const { createProduct, listProducts, listProductsByUser, upload, deleteProduct, increaseQuantity, getProductDetailById } = require("../controllers/productController");
const { createCategory, listCategories, } = require("../controllers/categoryController");
const { createOrder, listOrdersByUser, ordersByVendor, updateOrderStatus, createCheckout, webhook } = require("../controllers/orderController");
const { farmersList } = require("../controllers/farmersController");

const { userAuth } = require("../helpers/authHelper");

/* --- || User Routes || --- */
route.post("/login", userLogin);
route.post("/register", userRegistration);
route.put("/profileupdate", userProfileUpdate);
route.put("/changepassword", userChangePassword);
route.put("/userProfilePhotoUpdate", upload.single("profilePhoto"), userProfilePhotoUpdate);
route.get("/api/getUserById/:userId", getUserById);

/** ----- || Product Routes || ----- */
route.post("/api/createProduct", upload.single("products"), createProduct);
route.get("/api/listProducts", listProducts);
route.get("/api/listProductsByUser",userAuth, listProductsByUser);
route.delete("/api/deleteProduct", deleteProduct);
route.put("/api/increaseQuantity", increaseQuantity);
route.get("/api/getProductDetailById", getProductDetailById);

/** ----- || Category Routes || ----- */
route.post("/api/createCategory", createCategory);
route.get("/api/listCategory", listCategories);

/** ------- || Order Routes || ------- */
route.post("/api/createOrder", createOrder);
route.get("/api/listOrdersByUser", listOrdersByUser);
route.get("/api/ordersByVendor", ordersByVendor);
route.post("/api/updateOrderStatus", updateOrderStatus);
route.post("/api/createCheckout", createCheckout);

route.post('/webhook', express.raw({ type: 'application/json' }), webhook);

route.get('/api/farmersList', farmersList);

module.exports = route;
