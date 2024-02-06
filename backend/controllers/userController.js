const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generateJWTHelper");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");

const userRegistration = async (req, res) => {
    try {
        const { username, email, password, role, profileInfo } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(400).json(errorResponse(400, alertMessage.users.userAlreadyExistsEmail, {}));
        }

        // Hash the password //check
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
        const createdUser = await newUser.save();

        // Respond with success message
        res.json(successResponse(200, alertMessage.users.createSuccess, createdUser));
    } catch (error) {
        // console.error("Registration error:", error);
        res.status(500).json(errorResponse(500, alertMessage.users.createError, error));
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json(errorResponse(400, alertMessage.users.noUserDataFound, {}));
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json(errorResponse(400, alertMessage.users.invalidPassword, {}));
        }

        // Create and sign a JSON Web Token (JWT)
        const token = await generateJWT({ _id: user._id });
        const response = {
            user,
            token
        };
        res.status(200).json(successResponse(200, alertMessage.users.loginSuccess, response));
    } catch (error) {
        // console.error("Login error:", error);
        res.status(500).json(errorResponse(500, alertMessage.users.loginError, error));
    }

}

module.exports = { userRegistration, userLogin };