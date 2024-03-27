import React, { useState } from "react";
import { Box, TextField, Typography, Button, Card, CardContent, Grid, Container, } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid")

  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.map((p) => p.totalPrice).reduce((a, b) => a + b, 0);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    // Prepare the order data
    const orderData = {
      userId: userId,
      orderedItems: cartItems,
      totalPrice: totalAmount,
      addressLine,
      city,
      pincode,
    };
    const result = await axios.post("http://localhost:5000/api/createOrder", orderData);
    if (result.data.status) {
      dispatch(cartActions.replaceCart({ totalQuantity: 0, items: [] }));
      toast.success(result.data.message)
      navigate("/");
    } else {
      toast.error(result.data.message)
    }
  };

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
        <form onSubmit={handlePlaceOrder}>
          <TextField required fullWidth id="addressLine" label="Address Line" multiline
            margin="normal"
            rows={4}
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
          />
          <TextField required fullWidth id="city" label="City"
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField required fullWidth id="pincode" label="Pin Code" value={pincode}
            margin="normal"
            onChange={(e) => setPincode(e.target.value)}
          />

          <Typography variant="h6" component="div" margin="normal">
            Total Amount: ${totalAmount.toFixed(2)}
          </Typography>
          <Button
            margin="normal"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Place Order
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CheckoutForm;
