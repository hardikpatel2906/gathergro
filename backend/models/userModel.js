const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        email: {
            type: String
        },
        role: {
            type: String
        },
        profileInfo: {
            type: Array
        },
        favorites: {
            type: Array
        },
        location: {
            lat: { type: String },
            long: { type: String }
        }
    },
    {
        timestamps: true
    }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
