const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderedItems: {
            type: Array
        },
        totalPrice: {
            type: Number
        },
        orderDate: {
            type: Date,
            default: new Date()
        },
        status: {
            type: String,
            default: "Confirmed"
        },
        addressLine: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);
const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
