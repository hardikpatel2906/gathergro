const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");

const farmersList = async (req, res) => {
    try {
        const farmersList = await userModel.find({ role: "farmer" });
        if (farmersList && farmersList.length > 0) {
            res.json(successResponse(200, alertMessage.order.listSuccess, farmersList));
        } else {
            res.json(successResponse(200, alertMessage.order.noProducts, []));
        }
    } catch (error) {
        res.json(errorResponse(500, alertMessage.order.listError, {}));
    }
};

module.exports = { farmersList };
