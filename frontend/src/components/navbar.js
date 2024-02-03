import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GatherGro
          </Typography>
          {!token && <Button color="inherit" href="/login">
            Login
          </Button>}
          {!token && <Button color="inherit" href="/register">
            Register
          </Button>}
          {token && <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
