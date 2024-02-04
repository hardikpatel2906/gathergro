import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";



const CustomAppBar = styled(AppBar)({
  background: "#B4D9B6", // Change the background color to a nice color
});

const CustomButton = styled(Button)({
  marginLeft: "10px", // Add some spacing between buttons,
  color: "black",
});

const CustomLogoImg = styled("img")({
  height: "70px", // Adjust the height of the logo as needed
  marginRight: "10px", // Add spacing between the logo and buttons
});

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="static">
        <Toolbar>
          {/* Include your custom logo */}
          <CustomLogoImg src="/gathergrologo.png" alt="Custom Logo" />
          <Typography
            variant="h5"
            noWrap
            component="div"
            fontWeight={600}
            color= "black"
          >
            GatherGro
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Empty box to push buttons to the right */}
          {!token && (
            <CustomButton color="inherit" href="/login">
              Login
            </CustomButton>
          )}
          {!token && <CustomButton href="/register">Register</CustomButton>}
          {token && (
            <CustomButton color="inherit" onClick={handleLogout}>
              Logout
            </CustomButton>
          )}
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
};

export default Navbar;
