const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generateJWTHelper");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");
const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CN_CLOUD_NAME,
    api_key: process.env.CN_API_KEY,
    api_secret: process.env.CN_API_SECRET
});

//----------------------------------------------

// ------------------ | File Upload | -------------------
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "./assets/product_images");
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, files, cb) => {
        let ext = path.extname(files.originalname);
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".PNG" &&
            ext !== ".JPG" &&
            ext !== ".JPEG"
        ) {
            cb("Only images are allowd", null);
        }
        cb(null, true);
    },
});

/**
  USER REGISTRATION
 */
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
        // Response with catched error
        res.status(500).json(errorResponse(500, alertMessage.users.createError, error));
    }
};


/**
  USER LOGIN
 */
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json(errorResponse(400, alertMessage.users.noUserDataFound, {}));
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json(errorResponse(400, alertMessage.users.invalidPassword, {}));
        }

        // Create and sign a JSON Web Token (JWT)
        const token = await generateJWT({ _id: user._id, username: user.username, role: user.role, profilePhoto: user.profilePhoto });
        const response = {
            user,
            token,
        };
        res
            .status(200)
            .json(successResponse(200, alertMessage.users.loginSuccess, response));
    } catch (error) {
        // console.error("Login error:", error);
        res
            .status(500)
            .json(errorResponse(500, alertMessage.users.loginError, error));
    }
};


/**
  USER PROFILE UPDATE
 */
const userProfileUpdate = async (req, res) => {
    try {
        console.log("Inside the profile update");

        const { userId, username, contact, bio } = req.body;

        // Find the user by ID
        let user = await userModel.findById(userId);

        // Update the username if provided
        if (username) {
            user.username = username;
        }

        // Update the contact and bio in profileInfo if provided
        if (contact || bio) {
            if (!user.profileInfo || user.profileInfo.length === 0) {
                // If profileInfo array is empty, create a new object and push it
                user.profileInfo = [{ contact: "", bio: "" }];
            }

            // Update the first element of profileInfo array
            const profileObj = user.profileInfo[0];

            if (contact) {
                profileObj.contact = contact;
            }
            if (bio) {
                profileObj.bio = bio;
            }
        }
        console.log(user);
        // Save the updated user
        const updatedUser = await userModel.findByIdAndUpdate(
            { _id: userId },
            { $set: user }
        );

        // Respond with success message and updated user object
        res.json(
            successResponse(200, alertMessage.users.profileUpdateSuccess, updatedUser)
        );
    } catch (error) {
        // Handle error
        res
            .status(500)
            .json(errorResponse(500, alertMessage.users.profileUpdateError, error));
    }
};


/**
  CHANGE PASSWORD
 */
const userChangePassword = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { currentPassword, newPassword } = req.body;

        // Retrieve the user from the database
        const user = await userModel.findById(userId);
        if (!user) {
            return res
                .status(400)
                .json(errorResponse(400, alertMessage.users.noUserDataFound, {}));
        }

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );
        if (!isPasswordValid) {
            return res
                .status(400)
                .json(errorResponse(400, alertMessage.users.invalidPassword, {}));
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await userModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

        // Respond with success message
        res.json(
            successResponse(200, alertMessage.users.passwordChangeSuccess, {})
        );
    } catch (error) {
        // Handle error
        res
            .status(500)
            .json(errorResponse(500, alertMessage.users.passwordChangeError, error));
    }
};


/**
 * USER PROFILE PHOTO UPDATE
 */
const userProfilePhotoUpdate = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(req.file);
        const imageUploadResult = await cloudinary.uploader.upload(req.file.path)

        const result = await userModel.findByIdAndUpdate(userId, { profilePhoto: imageUploadResult.secure_url });

        if (result) {
            res.json(successResponse(200, alertMessage.users.profilePhotoUpdateSuccess, result));
        } else {
            // console.log("error")
            res.json(errorResponse(500, alertMessage.users.profilePhotoUpdateError, {}));
        }
    } catch (error) {
        console.log(error)

        res.json(errorResponse(500, alertMessage.users.profilePhotoUpdateError, error));
    }
};


/**
 * GET USER BY ID
 */
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log(userId);
        const userData = await userModel.findById(userId);
        if (userData) {
            res.json(successResponse(200, alertMessage.users.listSuccess, userData));
        } else {
            res.json(errorResponse(500, alertMessage.users.listError, {}));
        }
    } catch (error) {
        res.json(errorResponse(500, alertMessage.users.listError, error));
    }
}

module.exports = { userRegistration, userLogin, userProfileUpdate, userChangePassword, userProfilePhotoUpdate, getUserById };
