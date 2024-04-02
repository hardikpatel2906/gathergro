import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomButton = styled(Button)({
  marginLeft: "10px",
  color: "black",
  background: "#B4D9B6",
  margin: "5px"
});

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
    // console.log(formData);
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
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        {productImage != "" &&
          <>
            <img height={70} width={70} src={productImage != "" ? URL.createObjectURL(productImage) : null} />
            <CustomButton onClick={() => { setProductImage("") }}>Delete</CustomButton>
          </>
        }
        <form onSubmit={formSubmit}>
          <input accept="image/*" type="file" onChange={onImgChange} />

          <TextField
            label="ProductName"
            fullWidth
            margin="normal"
            variant="outlined"
            value={productName}
            required
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            id="outlined-select-category"
            select
            fullWidth
            label="Select Product Category"
            defaultValue=""
            margin="normal"
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="quantity"
            fullWidth
            margin="normal"
            variant="outlined"
            value={quantity}
            required
            onChange={(e) => setquantity(e.target.value)}
          />
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Create Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default AddProduct;
