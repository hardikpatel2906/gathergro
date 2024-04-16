const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const ElasticEmail = require("@elasticemail/elasticemail-client");
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications["apikey"];
apikey.apiKey = process.env.ELASTIC_EMAIL_API_KEY;


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
      const receiptMessage = `<h1>Order Confirmation</h1><p>Thank you for your order!</p><p>Total Price: $${orderTotalPrice}</p>`;
      await sendReceiptEmail(email, "Your Order Receipt", receiptMessage);
      return order; 
    });

    await Promise.all(orderPromises);

  res.json(
    successResponse(200, "Order created and email sent successfully", {})
  );
  } catch (error) {
    console.error("Failed to create order:", error);
     res.json(
       errorResponse(500, "Failed to create order or send email", error)
     );
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

/**
 * CREATE ORDER 
 */
const generateOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);
  const email = data.customer_details.email;
  const totalPrice = (data.amount_subtotal) / 100

  const newOrder = new orderModel({
    userId: customer.metadata.userId,
    paymentIntentId: data.payment_intent,
    orderedItems: items,
    email: data.customer_details.email,
    totalPrice: totalPrice,
    addressLine: data.customer_details.address.line1,
    city: data.customer_details.address.city,
    pincode: data.customer_details.address.postal_code,
  });

  try {
    const saveOrder = await newOrder.save();
    const receiptMessage = `<h1>Order Confirmation</h1><p>Thank you for your order!</p><p>Total Price: $${totalPrice}</p>`;
    await sendReceiptEmail(email, "Your Order Receipt", receiptMessage);
  } catch (error) {
    console.log(error)
  }

}

const createCheckout = async (req, res) => {
  try {
    const { products, userId } = req.body;

    // Creating customer Data
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        cart: JSON.stringify(products)
      }
    })

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: product.productName,
          metadata: {
            id: product.id
          }
          // images: [`http://localhost:5000/product_images/${product.image}`]
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["CA"],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/paymentsuccess",
      cancel_url: "http://localhost:3000/cart",
    });
    // console.log(session);
    res.json({ id: session.id })
  } catch (error) {
    console.log(error);
  }
}


// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_de0def2815a832f0cb5cbc4c2ee768e8e986575bc2817fd07e8e3cd880bfa663";

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];


  let data;
  let eventType;
  let event;
  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(req['rawBody'], sig, endpointSecret);
      // console.log("Webhook verified.")
    } catch (err) {
      // console.log(err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then((customer) => {
      // console.log(customer);
      // console.log("data: ==>", data);
      generateOrder(customer, data);
    }).catch((err) => console.log(err.message))
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};



const sendReceiptEmail = async (email, subject, message) => {
  const emailsApi = new ElasticEmail.EmailsApi();

  const emailData = {
    Recipients: {
      To: [email],
    },
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: message,
        },
      ],
      From: "krushal.sadariya11@gmail.com",
      Subject: subject,
    },
    Options: {
      IsTransactional: true,
    },
  };

  const callback = function (error, data, response) {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("API called successfully. Email sent:", data);
    }
  };

  emailsApi.emailsTransactionalPost(emailData, callback);
};



module.exports = {
  createOrder,
  listOrdersByUser,
  ordersByVendor,
  updateOrderStatus,
  createCheckout,
  webhook
};