import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Link } from "@mui/material";

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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography variant="body2" align="center">
            Not have account with GatherGro? &nbsp;
            <Link
              component="button"
              onClick={() => {
                navigate("/register");
              }}
              style={{ marginBottom: "3px" }}
            >
              Register
            </Link>
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
