import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import ItemCard from "./itemCard";

const theme = createTheme({
  components: {
    // Style overrides for Slider component
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          backgroundColor: "navy",
          color: "white",
          borderRadius: "2px",
          padding: "2px 4px",
        },
      },
    },
  },
});

const CustomButton = styled(Button)({
  background: "#B4D9B6",
  color: "black",
  ":hover":{
    background:"#ccf2ce"
  }
});

function Home() {
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [availability, setAvailability] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get("http://localhost:5000/api/listProducts");
      if (result.data.status) {
        setProductList(result.data.response);
        setFilteredProducts(result.data.response);
      }
    };
    const fetchCategories = async () => {
      const result = await axios.get("http://localhost:5000/api/listCategory");
      if (result.data.status) {
        setCategories(result.data.response);
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, productList, priceRange, availability, selectedCategories]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterOpen(false);
  };

  const applyFilters = () => {
    let filtered = productList.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (availability) {
      filtered = filtered.filter((product) => product.available);
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }
    setFilteredProducts(filtered);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.checked);
  };

 const handleCategoryChange = (event) => {
   const categoryId = event.target.value;
   const currentIndex = selectedCategories.indexOf(categoryId);
   const newChecked = [...selectedCategories];

   if (currentIndex === -1) {
     newChecked.push(categoryId);
   } else {
     newChecked.splice(currentIndex, 1);
   }

   setSelectedCategories(newChecked);
 };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          sx={{
            flexGrow: 1,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <TextField
            variant="outlined"
            label="Search Products"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: "auto" }}
          />
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
        </Box>
        <Dialog open={filterOpen} onClose={handleCloseFilterDialog}>
          <DialogTitle>Filter Options</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={availability}
                    onChange={handleAvailabilityChange}
                  />
                }
                label="Available Only"
              />
            </FormGroup>
            <Typography gutterBottom>Categories</Typography>
            {categories.map((category) => (
              <FormControlLabel
                key={category._id}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onChange={handleCategoryChange}
                    value={category._id}
                  />
                }
                label={category.categoryName}
              />
            ))}
            <Button
              onClick={() => {
                applyFilters();
                setFilterOpen(false);
              }}
            >
              Apply Filters
            </Button>
          </DialogContent>
        </Dialog>
        <Box sx={{ flexWrap: "wrap", display: "flex", gap: "16px" }}>
          <Grid container spacing={1}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                {/* <Card
                  sx={{
                    maxWidth: 320,
                    minWidth: 240,
                    margin: 2,
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/product/${product._id}`, { state: { product } })
                  }
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={`http://localhost:5000/product_images/${product.productImages}`}
                    alt={product.productName}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "space-around", margin:'10px' }}>
                    <CustomButton size="medium" variant="contained" onClick={addItemHandler} >
                      Add to cart
                    </CustomButton>
                    <CustomButton size="medium" variant="contained">
                      Buy Now
                    </CustomButton>
                  </CardActions>
                </Card> */}
                <ItemCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Home;
