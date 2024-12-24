import { useEffect, useState } from "react";
import { Container, Box, Typography, TextField, Button, MenuItem, } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});

const styles = {
    textField: {
        '& .MuiInputBase-root': {
            fontFamily: 'Jost', // Change font family for input text
        },
        '& .MuiInputLabel-root': {
            fontFamily: 'Jost', // Change font family for label
        }
    }
}

const AddProduct = () => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userid")
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setquantity] = useState("");
    const [error, setError] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const result = await axios.get("http://localhost:5000/api/listCategory");
        if (result.data.status) {
            setCategories(result.data.response);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const onImgChange = (e) => {
        // console.log(e.target.files)
        setProductImage(e.target.files[0]);
    };
    const categoryChangeHandle = (e) => {
        // console.log(e.target.value)
        setCategoryId(e.target.value);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("products", productImage);
        formData.append("price", price);
        formData.append("vendorId", userId);
        formData.append("categoryId", categoryId);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("available", true);

        const result = await axios.post(
            "http://localhost:5000/api/createProduct",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        if (result.data.status) {
            toast.success(result.data.message)
            navigate("/myproducts");
        } else {
            toast.error(result.data.message)
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" sx={{ fontFamily: "Jost", mb: 2 }}>
                    Add Product
                </Typography>
                {productImage != "" &&
                    <>
                        <img height={70} width={70} src={productImage != "" ? URL.createObjectURL(productImage) : null} />
                        <CustomButton onClick={() => { setProductImage("") }}>Delete</CustomButton>
                    </>
                }
                <Box component="form" onSubmit={formSubmit} sx={{ mt: 1, width: 350, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input accept="image/*" type="file" onChange={onImgChange} />

                    <TextField
                        label="Product Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={productName}
                        required
                        sx={styles.textField}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <TextField
                        id="outlined-select-category"
                        select
                        fullWidth
                        label="Select Product Category"
                        defaultValue=""
                        margin="normal"
                        sx={styles.textField}
                        onChange={categoryChangeHandle}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.categoryName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Price"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        value={price}
                        required
                        sx={styles.textField}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={description}
                        required
                        sx={styles.textField}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="quantity"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={quantity}
                        required
                        sx={styles.textField}
                        onChange={(e) => setquantity(e.target.value)}
                    />
                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <CustomButton
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Create Product
                    </CustomButton>
                </Box>
            </Box>
        </Container>
    );
};
export default AddProduct;
