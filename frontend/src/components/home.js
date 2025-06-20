import React, { useState, useEffect } from "react";
import { useMediaQuery, Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, FormGroup, FormControlLabel, Checkbox, Slider, ThemeProvider, createTheme, } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import ItemCard from "./itemCard";
import FarmersList from "./FarmersList";
import Map from "./map";

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
            fontFamily: 'Jost',
        },
        '& .MuiInputLabel-root': {
            fontFamily: 'Jost',
        }
    }
}

//   const columns = getColumns();
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

    /**
     * MEDIA QUERY
     */
    const isXs = useMediaQuery("(max-width:600px)"); // Extra small devices
    const isSm = useMediaQuery("(min-width:601px) and (max-width:960px)"); // Small devices
    const isMd = useMediaQuery("(min-width:961px) and (max-width:1440px)"); // Medium devices
    const isLg = useMediaQuery("(min-width:1441px)"); // Large devices

    const getColumns = () => {
        if (isXs) return 1; // 1 column for extra small screens
        if (isSm) return 2; // 2 columns for small screens
        if (isMd) return 3; // 3 columns for medium screens
        if (isLg) return 4; // 4 columns for large screens
        return 1; // Default to 1 column
    };

    const columns = getColumns()
    // console.log(columns);
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
                        margin: "20px"
                    }}
                >
                    <IconButton onClick={handleFilterClick}>
                        <FilterListIcon />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        label="Search Products"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        size="small"
                        sx={styles.textField}
                    // sx={{ width: "auto" }}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            mb: 2,
                            display: "flex",
                            // alignItems: "center",
                            // justifyContent: "space-between",
                            // margin: "20px",
                            flexDirection: "column",
                            width: "25%",
                            height: "100vh"
                        }}
                    >
                        <Box
                            sx={{
                                // display: "flex",
                                // alignItems: "center",
                                // height: "40%"
                            }}
                        >
                            <FarmersList />
                        </Box>
                        <Box sx={{
                            height: "50%", // Optional: lower half
                            display: "flex",
                            margin: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                            // padding: "10px",
                            border: "1px solid black",
                            borderRadius: "5px",
                            // overflow: "auto",
                        }}>
                            {/* <Map /> */}
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCgXytgbiFKaAPMmUypVh43ueYUZAG0SO0&q=senior+assisted+care+near+me&zoom=9">
                            </iframe>
                        </Box>
                    </Box>
                    <Dialog open={filterOpen} onClose={handleCloseFilterDialog}>
                        <DialogTitle sx={{ fontFamily: "Jost" }}>Filter Options</DialogTitle>
                        <DialogContent>
                            <Typography gutterBottom sx={{ fontFamily: "Jost" }}>Price Range</Typography>
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
                                    label={<Typography sx={{ fontFamily: "Jost" }}>Available Only</Typography>}
                                />
                            </FormGroup>
                            <Typography gutterBottom sx={{ fontFamily: "Jost" }}>Categories</Typography>
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
                                    label={<Typography sx={{ fontFamily: "Jost" }}>{category.categoryName}</Typography>}
                                />
                            ))}
                            <CustomButton
                                onClick={() => {
                                    applyFilters();
                                    setFilterOpen(false);
                                }}
                            >
                                Apply Filters
                            </CustomButton>
                        </DialogContent>
                    </Dialog>
                    <Box sx={{ flexWrap: "wrap", display: "flex", gap: "16px", width: "75%" }}>
                        <Grid container spacing={2} sx={{ flexWrap: "wrap", margin: "0 auto" }}>
                            {/*filteredProducts.length > 0 ?*/ filteredProducts.map((product) => (
                                <Grid item
                                    // xs={12} sm={6} md={4} lg={3} xl={2} 
                                    xs={12 / columns} sm={12 / columns} md={12 / columns} lg={12 / columns}
                                    key={product._id}>
                                    <ItemCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default Home;
