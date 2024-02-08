const express = require("express");
const route = express.Router();
module.exports = route;
const {
  userLogin,
  userRegistration,
  userProfileUpdate,
  userChangePassword,
} = require("../controllers/userController");

/* --- || User Routes || --- */
route.post("/login", userLogin);
route.post("/register", userRegistration);
route.put("/profileupdate", userProfileUpdate);
route.put("/changepassword", userChangePassword);


module.exports = route;