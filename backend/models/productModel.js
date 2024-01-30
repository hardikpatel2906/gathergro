const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
        },
        price: {
            type: Number
        },
        description: {
            type: String
        },
        quantity: {
            type: Number
        },
        available: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
);
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
