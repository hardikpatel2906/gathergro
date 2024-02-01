const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const userModel = require("../models/userModel");

// Registration Route
router.post(
  "/register",
  [  
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    // more validation checks as needed
  ],
  async (req, res) => {
      try {
        console.log("register api call");
      const { username, email, password, role, profileInfo } = req.body;

      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        role,
        profileInfo,
      });

      // Save the user to the database
      await newUser.save();

      // Respond with success message
      res.json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  }
);

// Login Route
router.post(
  "/login",
  [
    // Validation checks for login (e.g., email format)
    check("email").isEmail(),
    // Add more validation checks as needed
  ],
  async (req, res) => {
      try {
        
      const { email, password } = req.body;

      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid password" });
      }
   
      // Create and sign a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  }
);

module.exports = router;
