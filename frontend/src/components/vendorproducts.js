import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
    marginLeft: "10px",
    color: "black",
});

const VendorProducts = () => {
    return (
        <>
            <h1>Vendor Products</h1>
            <CustomButton color="inherit" href="/addproduct">
                Add Product
            </CustomButton>
        </>
    )
};
export default VendorProducts;