
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import { toast } from "react-toastify";
import { useState } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});

const ItemCard = ({ product }) => {
    const [weight, setWeight] = useState("lb");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { _id, productName, price, productImages, vendorId } = product;

    //Handle Weight change
    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    }

    const userId = localStorage.getItem("userid");
    const addItemHandler = () => {
        if (vendorId._id == userId) {
            toast.error("You cannot add your own product to cart!");
        } else {
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
    }

    return (
        <Card
            sx={{
                // width: 320,
                maxWidth: 320,
                minWidth: 250,
                // minHeight: 450,
                margin: "auto",
                cursor: "pointer",
            }}
        // onClick={() =>
        //     navigate(`/product/${product._id}`, { state: { product } })
        // }
        >
            <CardMedia
                component="img"
                height="230"
                width="230"
                // image={`http://localhost:5000/product_images/${product.productImages}`}
                image={product.productImages}
                alt={product.productName}
                onClick={() =>
                    navigate(`/product/${product._id}`, { state: { product } })
                }
            />
            <CardContent style={{ display: "flex", justifyContent: "space-between", margin: '0 10px' }}>
                <div>
                    <Typography variant="h6" component="div" style={{ fontFamily: "Jost" }}>
                        {product.productName}
                    </Typography>
                    <Typography variant="body1" style={{ fontFamily: "Jost" }}>
                        ${weight == "kg" ? (product.price * 2.2).toFixed(2) : product.price}
                    </Typography>
                    <Typography variant="body2" style={{ fontFamily: "Jost" }}>
                        Sold By: {product.vendorId.username}
                    </Typography>
                </div>
                <div>
                    <Typography variant="body2" component="div" style={{ fontFamily: "Jost" }}>
                        4.5<StarBorderIcon style={{ height: "15px" }} />
                    </Typography>
                </div>

                {/* <InputLabel id="p-weight">Weight</InputLabel> */}
                {/* <Select
                    // labelId="p-weight"
                    // id="weight"
                    value={weight}
                    onChange={handleWeightChange}
                    label="weight"
                >
                    <MenuItem value={"lb"}>lb</MenuItem>
                    <MenuItem value={"kg"}>kg</MenuItem>
                </Select> */}
                {product.quantity < 10 && <Typography variant="body2" color="red">Only few left!</Typography>}
            </CardContent>
            <CardActions style={{ justifyContent: "space-between", margin: '10px' }}>
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
