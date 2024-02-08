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
      res
        .status(400)
        .json(
          errorResponse(400, alertMessage.users.userAlreadyExistsEmail, {})
        );
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
    res.json(
      successResponse(200, alertMessage.users.createSuccess, createdUser)
    );
  } catch (error) {
    // console.error("Registration error:", error);
    res
      .status(500)
      .json(errorResponse(500, alertMessage.users.createError, error));
  }
};

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
    const token = await generateJWT({ _id: user._id });
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

module.exports = {
  userRegistration,
  userLogin,
  userProfileUpdate,
  userChangePassword,
};
