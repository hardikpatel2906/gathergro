import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, Chip, Stack, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";

function SingleProduct() {
  const location = useLocation();
  const { product } = location.state;

  if (!product) return <div>Loading...</div>;

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
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ mb: 4, textAlign: "center" }}
      >
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
            src={`http://localhost:5000/product_images/${product.productImages}`}
            alt={product.productName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ mb: 2, textAlign: "justify" }}
          >
            {product.description}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              label={product.available ? "Available" : "Unavailable"}
              color={product.available ? "success" : "error"}
            />
            <Chip label={`Quantity: ${product.quantity}`} />
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
        >
          Add to Cart
        </Button>
        <Button variant="outlined" color="primary" startIcon={<PaymentIcon />}>
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}

export default SingleProduct;
