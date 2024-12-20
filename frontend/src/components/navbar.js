import * as React from "react";
import { Typography, Avatar, Button, Toolbar, Box, AppBar, Menu, MenuItem, Badge, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomAppBar = styled(AppBar)({
    background: "#B4D9B6",
});

const CustomButton = styled(Button)({
    marginLeft: "10px",
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    },
});

const CustomLogoImg = styled("img")({
    height: "40px",
    marginRight: "10px",
    cursor: "pointer",
});

const Navbar = () => {
    const navigate = useNavigate();
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileUpdate = () => {
        navigate("/profileupdate");
        handleMenuClose();
    };

    const handleChangePassword = () => {
        navigate("/changepassword");
        handleMenuClose();
    };

    const handleMyProducts = () => {
        navigate("/myproducts");
        handleMenuClose();
    };
    const handleCustomerOrders = () => {
        navigate("/vendororders");
        handleMenuClose();
    };

    const handleCart = () => {
        navigate("/cart")
    }

    const handleMyOrders = () => {
        navigate("/myorders")
    }

    const badgeStyle = {
        "& .MuiBadge-badge": {
            color: 'black',
            backgroundColor: '#ffffff',
            borderRadius: '10px'
        },
        mr: 3,
        fontFamilys: "Jost"
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <CustomAppBar position="static">
                <Toolbar>
                    <CustomLogoImg src="/gather-gro.png" alt="Custom Logo" onClick={() => navigate("/")} />
                    {/* <Typography variant="h5" noWrap component="h1" fontWeight={600} color="black" sx={{ mr: 2, fontFamily:'Jost' }}>GatherGro</Typography> */}

                    <Box sx={{ flexGrow: 1 }} />
                    {/* <CustomButton component={Link} to="/about">
            About Us
          </CustomButton> */}
                    <Badge badgeContent={totalQuantity} sx={badgeStyle}>
                        <ShoppingCartOutlinedIcon
                            sx={{ color: "black" }}
                            onClick={handleCart}
                        />
                    </Badge>
                    {token && (
                        <>
                            {username && (
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                                    <Typography variant="body1" sx={{ fontFamily: "Jost", color: "black" }}>
                                        {username}
                                    </Typography>
                                </Box>
                            )}
                            <Avatar
                                alt="User Avatar"
                                onClick={handleMenuOpen}
                                sx={{ cursor: "pointer", fontFamily: "Jost", bgcolor: "#27ae60" }}
                            >
                                {username.charAt(0)}
                            </Avatar>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleProfileUpdate} sx={{ fontFamily: "Jost" }}>Update Profile</MenuItem>
                                <MenuItem onClick={handleChangePassword} sx={{ fontFamily: "Jost" }}>Change Password</MenuItem>
                                {role === "farmer" && (
                                    <>
                                        <MenuItem onClick={handleMyProducts} sx={{ fontFamily: "Jost" }}>My Products</MenuItem>
                                        <MenuItem onClick={handleCustomerOrders} sx={{ fontFamily: "Jost" }}>Consumer Orders</MenuItem>
                                    </>
                                )}
                                <MenuItem onClick={handleMyOrders} sx={{ fontFamily: "Jost" }}>My Orders</MenuItem>
                                <MenuItem onClick={handleLogout} sx={{ fontFamily: "Jost" }}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                    {!token && (
                        <>
                            <CustomButton color="inherit" href="/login">
                                Login
                            </CustomButton>
                            {/* <CustomButton href="/register">Register</CustomButton> */}
                        </>
                    )}
                </Toolbar>
            </CustomAppBar>
        </Box>
    );
};

export default Navbar;
