const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
    },
    profileInfo: {
      type: Array,
    },
    favorites: {
      type: Array,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
