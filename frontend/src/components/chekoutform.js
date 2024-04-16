import React, { useState } from "react";
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    // Loop through cart items and create an order for each
    for (let item of cartItems) {
      const orderData = {
        userId: userId,
        orderedItems: [item], // Send each item as a separate order
        totalPrice: item.price * item.quantity,
        addressLine,
        city,
        pincode,
        email,
      };

      try {
        const result = await axios.post(
          "http://localhost:5000/api/createOrder",
          orderData
        );
        if (result.data.status) {
          toast.success("Order placed for " + item.productName);
        } else {
          toast.error("Failed to place order for " + item.productName);
        }
      } catch (error) {
        toast.error("Error placing order for " + item.productName);
      }
    }

    // Clear the cart after placing orders
    dispatch(cartActions.replaceCart({ totalQuantity: 0, items: [] }));
    navigate("/");
  };


  const makePayment = async () => {
    // console.log("Hello")
    const stripe = await loadStripe("pk_test_51P3WBGP3QiX5wZP6swEDPqAfsRzjSBIdnsjn2nDFNe3dFgQOKZK4sVUAVPeog7Sg6krgyZUFI4HwGQs81cpQfdKY00uSGRUl1b")

    const body = {
      userId: userId,
      products: cartItems
    }

    const response = await axios.post("http://localhost:5000/api/createCheckout", body);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id
    });
   
    if (result.error) {
      console.log("err --", result.error);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Checkout
        </Typography>
        <form
        // onSubmit={handlePlaceOrder}
        >
          <TextField
            required
            fullWidth
            id="addressLine"
            label="Address Line"
            multiline
            margin="normal"
            rows={4}
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="city"
            label="City"
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="pincode"
            label="Pin Code"
            value={pincode}
            margin="normal"
            onChange={(e) => setPincode(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography variant="h6" component="div" margin="normal">
            Total Amount: ${totalAmount.toFixed(2)}
          </Typography>
          <Button
            margin="normal"
            // type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={makePayment}
          >
            Place Order
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CheckoutForm;
