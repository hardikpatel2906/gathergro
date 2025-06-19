import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, Chip, Stack, Grid, TextField } from "@mui/material";
import axios from "axios";
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
    const [quantity, setQuantity] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await axios.get("http://localhost:5000/api/listProducts");
            if (result.data.status) {
                setRelatedProducts(result.data.response);
            }
        };
        fetchProducts();
    }, []);

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
        <>
            <Box
                sx={{
                    px: { xs: 2, md: 4 },
                    py: { xs: 4, md: 7 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid
                    container
                    spacing={4}
                    sx={{ maxWidth: 1200, alignItems: "flex-start" }}
                >
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={product.productImages}
                            alt={product.productName}
                            sx={{
                                width: "100%",
                                height: "100%",
                                maxHeight: { xs: 300, md: 400 },
                                objectFit: "cover",
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                            <Typography variant="h3" sx={{ fontFamily: "Jost" }}>
                                {product.productName}
                            </Typography>

                            {/* Description with Show More */}
                            <Box>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                    sx={{
                                        fontFamily: "Jost",
                                        textAlign: "justify",
                                        display: "-webkit-box",
                                        WebkitLineClamp: isExpanded ? "none" : 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {product.description}
                                </Typography>

                                {product.description.split(" ").length > 10 && (
                                    <Button
                                        variant="text"
                                        size="small"
                                        sx={{ fontFamily: "Jost", textTransform: "none", px: 0 }}
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? "See less" : "See more"}
                                    </Button>
                                )}
                            </Box>

                            {/* Price */}
                            <Typography variant="h5" sx={{ fontFamily: "Jost" }}>
                                ${product.price} CAD
                            </Typography>

                            {/* Availability and Quantity */}
                            <Stack direction="row" spacing={2}>
                                <Chip
                                    label={product.available ? "Available" : "Unavailable"}
                                    color={product.available ? "success" : "error"}
                                    sx={{ fontFamily: "Jost" }}
                                />
                                <Chip
                                    label={`Quantity: ${product.quantity}`}
                                    sx={{ fontFamily: "Jost" }}
                                />
                            </Stack>

                            {/* Seller Info */}
                            <Typography variant="h6" sx={{ fontFamily: "Jost" }}>
                                Sold and shipped by: {product.vendorId?.username}
                            </Typography>

                            {/* Quantity & Add to Cart */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <RemoveCircleOutline
                                        color="success"
                                        onClick={removeQty}
                                        sx={{ fontSize: 30, cursor: "pointer" }}
                                    />
                                    <Typography variant="h6" sx={{ fontFamily: "Jost", mx: 2 }}>
                                        {quantity}
                                    </Typography>
                                    <AddCircleOutline
                                        color="success"
                                        onClick={addQty}
                                        sx={{ fontSize: 30, cursor: "pointer" }}
                                    />
                                </Box>

                                <CustomButton size="medium" variant="contained" onClick={addItemHandler}>
                                    Add to cart
                                </CustomButton>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 1, px: { xs: 2, md: 4 } }}>
                <Typography variant="h5" sx={{ mb: 2, fontFamily: "Jost" }}>
                    More from {product.vendorId?.username}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        gap: 2,
                        scrollSnapType: "x mandatory",
                        pb: 1,
                        px: 1,
                        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for cleaner look
                    }}
                >
                    {relatedProducts.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: "0 0 auto",
                                minWidth: 180,
                                maxWidth: 200,
                                scrollSnapAlign: "start",
                            }}
                        >
                            <Box
                                component="img"
                                src={item.productImages}
                                alt={item.productName}
                                sx={{
                                    width: "100%",
                                    height: 140,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                }}
                            />
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontFamily: "Jost",
                                    mt: 1,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                }}
                            >
                                {item.productName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontFamily: "Jost", color: "text.secondary", textAlign: "center" }}
                            >
                                ${item.price}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

        </>
    );
}

export default SingleProduct;
