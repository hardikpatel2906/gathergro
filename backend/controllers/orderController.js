const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");
const mongoose = require("mongoose");

/**
 * CREATE ORDER
 */
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderedItems,
      orderDate,
      status,
      addressLine,
      city,
      pincode,
      email,
    } = req.body;

    // Create a separate order for each item
    const orderPromises = orderedItems.map(async (item) => {
      const orderTotalPrice = item.price * item.quantity;
      const order = new orderModel({
        userId,
        vendorId: item.vendorId, // Assuming each item includes vendorId
        orderedItems: [item], // Each order contains only this item
        totalPrice: orderTotalPrice,
        orderDate,
        status,
        addressLine,
        city,
        pincode,
        email,
      });
      await order.save();
      return order; // You might want to return some identifier here
    });

    // Wait for all orders to be created
    await Promise.all(orderPromises);

    res.json(
      successResponse(200, "Order created successfully for each item", {})
    );
  } catch (error) {
    console.error("Failed to create order:", error);
    res.json(errorResponse(500, "Failed to create order", error));
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

/**
 * ORDERS BY VENDOR
 */
const ordersByVendor = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    if (!vendorId) {
      return res.json(errorResponse(400, "Vendor ID is required"));
    }

    // No need to convert vendorId to ObjectId; Mongoose does that automatically
    const ordersData = await orderModel
      .find({ vendorId: vendorId }) // Directly use vendorId in your query
      .populate("userId", "username") // Example of populating user details
      // You can adjust or remove this populate() call based on your needs
      .exec(); // Execute the query

    if (ordersData.length > 0) {
      res.json(successResponse(200, "Orders fetched successfully", ordersData));
    } else {
      res.json(successResponse(200, "No orders found for this vendor", []));
    }
  } catch (error) {
    console.error("Failed to fetch orders for vendor:", error);
    res.json(errorResponse(500, "Failed to fetch orders", error));
  }
};



/**
 * UPDATE ORDER STATUS
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    if (!orderId || !newStatus) {
      return res.json(errorResponse(400, "Order ID and new status are required"));
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json(errorResponse(404, "Order not found"));
    }

    // Optionally, check if the `req.user` is the vendor of this order
    // if (req.user._id !== order.vendorId.toString()) {
    //   return res.json(errorResponse(403, "You do not have permission to update this order"));
    // }

    order.status = newStatus;
    await order.save();

    res.json(successResponse(200, "Order status updated successfully", order));
  } catch (error) {
    console.error("Failed to update order status:", error);
    res.json(errorResponse(500, "Failed to update order status", error));
  }
};


module.exports = {
  createOrder,
  listOrdersByUser,
  ordersByVendor,
  updateOrderStatus,
};