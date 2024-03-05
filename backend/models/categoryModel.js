const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    }
);
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
