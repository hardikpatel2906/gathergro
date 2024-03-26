import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.totalPrice, 0)
  );

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    // Prepare the order data
    const orderData = {
      deliveryAddress,
      orderedItems: cartItems,
      totalPrice: totalAmount,
      // Include any additional fields here
    };
    console.log(orderData);
    // Here you would typically send this data to your server
    // via an API call for further processing
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          Checkout
        </Typography>
        <form onSubmit={handlePlaceOrder}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="deliveryAddress"
                label="Delivery Address"
                multiline
                rows={4}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </Grid>
            {/* Future fields for additional info can be added here */}
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                Total Amount: ${totalAmount.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
