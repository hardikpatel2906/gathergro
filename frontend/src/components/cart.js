import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { cartActions } from '../store/cart-slice';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
    background: "#B4D9B6",
    color: "black",
    ":hover": {
        background: "#ccf2ce"
    }
});


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (

        <div style={{ width: '50%', margin: '0 auto' }}>
            {(cartItems.length > 0) &&
                <>
                    {cartItems.map((product) => (
                        <Card key={product.id} sx={{ display: 'flex', margin: '15px' }}>
                            <CardMedia component='img' image={`http://localhost:5000/product_images/${product.image}`} sx={{ width: 150, height: 150 }} alt="product image" />
                            <Box sx={{ flexDirection: 'column', display: 'inline-block', width: '80%', verticalAlign: 'top' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <CardContent sx={{ flex: '1 0 auto', padding: '10px' }}>
                                        <Typography component="div" variant="body1">{product.productName}</Typography>
                                        <Typography variant="body2" color="text.secondary" component="div">${product.price}</Typography>
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
                                        <Typography variant="body2" color="text.secondary" component="div" >{product.quantity}</Typography>
                                        <AddCircleOutline
                                            color="success"
                                            onClick={() => addQty(product.id, product.price)}
                                            sx={{ fontSize: 20, padding: '0 10px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 10px' }}>
                                        <Typography variant="body2" color="text.secondary" component="div" >${product.quantity * product.price}</Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                    <CustomButton size="medium" variant="contained" onClick={() => {navigate("/checkout");}}>Checkout - ${totalAmount.toFixed(2)}</CustomButton>
                </>
            }
            {(cartItems.length == 0) && 
            <>
                <Typography variant='h4'> Your Cart is Empty ! </Typography>
                <CustomButton size="medium" variant="contained" onClick={() => {navigate("/");}}>Continue Shopping</CustomButton>

            </>}
        </div >
    );
};
export default Cart;