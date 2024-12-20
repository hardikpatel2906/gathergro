import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { cartActions } from '../store/cart-slice';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";


const CustomButton = styled(Button)({
    marginLeft: "10px",
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = cartItems.map((p) => p.totalPrice).reduce((a, b) => a + b, 0);

    const addQty = (id, price) => {
        dispatch(cartActions.addQuantity({ id, price }))
    };

    const removeQty = (id, price) => {
        dispatch(cartActions.removeQuantity({ id, price }))
    }

    const removeItem = (id, price, quantity) => {
        dispatch(cartActions.removeItemFromCart({ id, price, quantity }));
    }


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
        <div style={{ width: '50%', margin: '0 auto', alignItems: "center", display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ mt: 2, fontFamily: "Jost" }} >
                Shopping Cart
            </Typography>
            {(cartItems.length > 0) &&
                <>
                    {cartItems.map((product) => (
                        <Card key={product.id} sx={{ display: 'flex', margin: '15px', width: "70%" }}>
                            <CardMedia component='img' image={product.image} sx={{ width: 100, height: 100 }} alt="product image" />
                            <Box sx={{ flexDirection: 'column', display: 'inline-block', width: '80%', verticalAlign: 'top' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <CardContent sx={{ padding: '10px' }}>
                                        <Typography component="div" variant="h6" sx={{ fontFamily: "Jost" }}>{product.productName}</Typography>
                                        <Typography variant="body2" component="div" sx={{ fontFamily: "Jost" }}>${product.price}</Typography>
                                    </CardContent>
                                    <Box sx={{ marginLeft: 'auto', padding: '5px' }}>
                                        <DeleteOutlined
                                            onClick={() => removeItem(product.id, product.price, product.quantity)}
                                        />
                                    </Box>
                                </div>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <RemoveCircleOutline
                                            color="success"
                                            onClick={() => removeQty(product.id, product.price)}
                                            sx={{ fontSize: 20, padding: '0 10px' }}
                                        />
                                        <Typography variant="body2" component="div" sx={{ fontFamily: "Jost" }} >{product.quantity}</Typography>
                                        <AddCircleOutline
                                            color="success"
                                            onClick={() => addQty(product.id, product.price)}
                                            sx={{ fontSize: 20, padding: '0 10px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 10px' }}>
                                        <Typography variant="body2" component="div" sx={{ fontFamily: "Jost" }}>Total: ${(product.quantity * product.price).toFixed(2)}</Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                    <CustomButton size="medium" variant="contained" onClick={makePayment}>Checkout - ${totalAmount.toFixed(2)}</CustomButton>
                </>
            }
            {(cartItems.length == 0) &&
                <>
                    <Typography variant='h4' sx={{ fontFamily: "Jost", mt: 4, mb: 3}}> Your Cart is Empty !</Typography>
                    <img src='empty-cart.png' alt='Cart-Image' height={250} />
                    <CustomButton size="medium" variant="contained" onClick={() => { navigate("/"); }}>Continue Shopping</CustomButton>
                </>}
        </div >
    );
};
export default Cart;