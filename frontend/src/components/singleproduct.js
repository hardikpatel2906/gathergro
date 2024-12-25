import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, Chip, Stack, Grid, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";


const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});


const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1)


    const dispatch = useDispatch();

    const location = useLocation();
    const { product } = location.state;

    if (!product) return <div>Loading...</div>;

    const addItemHandler = () => {
        const { _id, productName, price, productImages } = product;
        dispatch(cartActions.addItemToCart({ _id, productName, price, productImages, quantity }));
        toast.success(`${productName} added to cart successfully!`);
    }

    const addQty = () => {
        setQuantity(quantity + 1);
    }

    const removeQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            alert("Can't remove Qty")
        }
    }

    return (
        <Box
            sx={{
                // minHeight: "100vh",
                px: 4, // Keeps horizontal padding
                py: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
                // backgroundColor: "#f5f5f5",
            }}
        >
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
                    <Typography variant="h3" sx={{ mb: 2, fontFamily: "Jost" }}>
                        {product.productName}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ mb: 2, textAlign: "justify", fontFamily: "Jost" }}
                    >
                        {product.description}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "Jost" }}>
                        ${product.price} CAD
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip sx={{ fontFamily: "Jost" }}
                            label={product.available ? "Available" : "Unavailable"}
                            color={product.available ? "success" : "error"}
                        />
                        <Chip label={`Quantity: ${product.quantity}`} sx={{ fontFamily: "Jost" }} />
                    </Stack>
                    <Typography variant="h6" sx={{ mb: 2, fontFamily: "Jost" }}>
                        Sold and shiped by: {product.vendorId.username}
                    </Typography>
                    <Box sx={{ mt: 1, display: "flex", alignContent: "baseline", gap: 2 }}>
                        {/* <Button
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
            </Button> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:"center" }}>
                            <RemoveCircleOutline
                                color="success"
                                onClick={removeQty}
                                sx={{ fontSize: 30, padding: '0 10px' }}
                            />
                            {/* <TextField variant="outlined" id="quantity" name="quantity" value={quantity} size="small" onChange={(e) => setQuantity(e.target.value)} sx={{ width: "70px", fontFamily: "Jost" }} disabled /> */}
                            <Typography variant="h6" sx={{ fontFamily: "Jost" }} >{quantity}</Typography>
                            <AddCircleOutline
                                color="success"
                                onClick={addQty}
                                sx={{ fontSize: 30, padding: '0 10px' }}
                            />
                        </div>
                        <CustomButton size="medium" variant="contained" onClick={addItemHandler} >
                            Add to cart
                        </CustomButton>
                        {/* <CustomButton size="medium" variant="contained">
              Buy Now
            </CustomButton> */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SingleProduct;
