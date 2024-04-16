import { useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";

const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(cartActions.replaceCart({ totalQuantity: 0, items: [] }));
    })

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
                    Payment Successful!
                </Typography>
                <Button onClick={() => { navigate("/"); }}>Continue Shopping</Button>
            </Box>
        </Container>
    )
};
export default PaymentSuccess;