
import { Card, CardMedia, CardContent, Typography, CardActions, Button, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import { toast } from "react-toastify";

const CustomButton = styled(Button)({
    background: "#27ae60",
    fontWeight:"bold",
    color: "white",
    ":hover": {
        background: "#ccf2ce"
    }
});

const ItemCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { _id, productName, price, productImages, vendorId } = product;
    const addItemHandler = () => {
        console.log("Adding to cart:", {
          _id,
          productName,
          price,
          productImages,
          vendorId,
        });
        dispatch(
          cartActions.addItemToCart({
            _id,
            productName,
            price,
            productImages,
            vendorId,
          })
        );
        toast.success(`${productName} added to cart successfully!`);
    }

    return (
        <Card
            sx={{
                maxWidth: 320,
                minWidth: 240,
                // minHeight: 450,
                margin: 2,
                // borderRadius: "15px",
                cursor: "pointer",
            }}
        // onClick={() =>
        //     navigate(`/product/${product._id}`, { state: { product } })
        // }
        >
            <CardMedia
                component="img"
                height="250"
                image={`http://localhost:5000/product_images/${product.productImages}`}
                alt={product.productName}
                onClick={() =>
                    navigate(`/product/${product._id}`, { state: { product } })
                }
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    ${product.price}
                </Typography>
                {product.quantity < 10 && <Typography variant="body2" color="red">Only few left!</Typography>}
            </CardContent>
            <CardActions style={{ justifyContent: "space-around", margin: '10px' }}>
                <CustomButton size="medium" variant="contained" onClick={addItemHandler} >
                    Add to cart
                </CustomButton>
                <CustomButton size="medium" variant="contained">
                    Buy Now
                </CustomButton>
            </CardActions>
        </Card>
    )
};
export default ItemCard;