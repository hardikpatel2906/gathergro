const orderModel = require("../models/orderModel");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");

/**
 * CREATE ORDER
 */
const createOrder = async (req, res) => {
    try {
        const { userId, orderedItems, totalPrice, orderDate, status, addressLine, city, pincode } = req.body;

        const order = new orderModel({ userId, orderedItems, totalPrice, orderDate, status, addressLine, city, pincode  });

        const createdOrder = await order.save();

        if (createdOrder) {
            res.json(successResponse(200, alertMessage.order.createSuccess, createdOrder));
        } else {
            res.json(errorResponse(500, alertMessage.order.createError, {}));
        }
    } catch (error) {
        // console.log(error);
        res.json(errorResponse(500, alertMessage.order.createError, error));
    }
};


/**
 * ORDER LIST
 */
const listOrdersByUser = async (req, res) => {
    try {
      const userId = req.query.userId;
      const ordersData = await orderModel.find({ userId: userId });
      if (ordersData && ordersData.length > 0) {
        res.json(
          successResponse(200, alertMessage.order.listSuccess, ordersData)
        );
      } else {
        res.json(successResponse(200, alertMessage.order.noProducts, []));
      }
    } catch (error) {
      res.json(errorResponse(500, alertMessage.order.listError, {}));
    }
  };

  module.exports = {createOrder, listOrdersByUser};