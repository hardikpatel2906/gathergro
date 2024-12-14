import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, Chip, Stack, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { toast } from "react-toastify";

function SingleProduct() {
  const dispatch = useDispatch();

  const location = useLocation();
  const { product } = location.state;

  if (!product) return <div>Loading...</div>;

  const addItemHandler = () => {

    const { _id, productName, price, productImages } = product;
    dispatch(cartActions.addItemToCart({ _id, productName, price, productImages }));
    toast.success(`${productName} added to cart successfully!`);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 4, // Keeps horizontal padding
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 2, fontFamily: "Jost", alignContent: "baseline" }}      >
        {product.productName}
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ maxWidth: 1200, alignItems: "flex-start" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 2,
            }}
            // src={`http://localhost:5000/product_images/${product.productImages}`}
            src={`${product.productImages}`}
            alt={product.productName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ mb: 2, textAlign: "justify", fontFamily: "Jost" }}
          >
            {product.description}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontFamily: "Jost" }}>
            ${product.price}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip sx={{ fontFamily: "Jost" }}
              label={product.available ? "Available" : "Unavailable"}
              color={product.available ? "success" : "error"}
            />
            <Chip label={`Quantity: ${product.quantity}`} sx={{ fontFamily: "Jost" }} />
          </Stack>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2, fontFamily: "Jost" }}>
            Sold and shiped by: {product.vendorId.username}
          </Typography>
          <Box sx={{ mt: 1, display: "flex", alignContent: "baseline", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={addItemHandler}
              sx={{ fontFamily: "Jost" }}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" color="primary" startIcon={<PaymentIcon />} sx={{ fontFamily: "Jost" }}  >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>


    </Box>
  );
}

export default SingleProduct;
