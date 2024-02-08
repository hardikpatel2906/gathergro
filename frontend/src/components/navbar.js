import * as React from "react";
import {
  Typography,
  Avatar,
  Button,
  Toolbar,
  Box,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)({
  background: "#B4D9B6",
});

const CustomButton = styled(Button)({
  marginLeft: "10px",
  color: "black",
});

const CustomLogoImg = styled("img")({
  height: "70px",
  marginRight: "10px",
  cursor: "pointer",
});

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="static">
        <Toolbar>
          <CustomLogoImg src="/gathergrologo.png" alt="Custom Logo" />
          <Typography
            variant="h5"
            noWrap
            component="h1"
            fontWeight={600}
            color="black"
          >
            GatherGro
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {token && (
            <>
              <Avatar
                alt="Remy Sharp"
                src="/gathergrologo.png"
                onClick={handleMenuOpen}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfileUpdate}>
                  Update Profile
                </MenuItem>
                <MenuItem onClick={handleChangePassword}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
          {!token && (
            <>
              <CustomButton color="inherit" href="/login">
                Login
              </CustomButton>
              <CustomButton href="/register">Register</CustomButton>
            </>
          )}
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
};

export default Navbar;
