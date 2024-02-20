import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login(email, password);
      // console.log(response);
      if (response.data.status) {
        const token = response.data.response.token;
        localStorage.setItem("authToken", token);
        navigate("/");
      }
      // Handle response, store token, redirect user, etc.
    } catch (error) {
      console.error("Login error", error.response.data);
      setError(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  const CustomButton = styled(Button)({
    // marginLeft: "10px",
    color: "black",
    backgroundColor: "#B4D9B6",
    paddingLeft:100,
    paddingRight:100,
    marginBottom:10
  });

  return (
    <div style={{flex:1, flexDirection:'row', display:'flex',height:700}}>
      <div style={{width:'50%'}}>
        <img 
          src={require('../constansts/Abstraction.png')} 
            style={{
              width:"130%", 
              height:"100%",
              opacity:0.8
            }}/>
      </div>
      <div style={{borderRadius:50,width:'50%'}}>
    {/* <Container maxWidth="sm"> */}
      <Box
        sx={{
          // marginTop: 8,
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          marginTop: 5,
          marginRight:10,
          marginLeft:10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius:10,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button> */}
          <CustomButton type="submit" variant="contained">
            Sign In
          </CustomButton>
          <Typography variant="body2" align="center">
            Not have account with GatherGro? 
            <Link component="button" onClick={() => {
              navigate("/register");
            }}>Register</Link>
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
      </div>
    {/* </Container> */}
    </div>
  );
}

export default Login;
