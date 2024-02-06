import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFarmer, setIsFarmer] = useState(false);
  const [contact, setContact] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPhoneNumber(contact)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
     if (!isValidPassword(password)) {
       setError(
         "Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 10 characters long."
       );
       return;
     }
    let role = isFarmer ? "farmer" : "consumer";
    let profileInfo = { contact, bio };

    if (isFarmer) {
      profileInfo.address = address;
    }

    try {
      const response = await authService.register(
        username,
        email,
        password,
        role,
        profileInfo
      );
      console.log("Response:", response);
      if (response.data.success) {
        navigate("/login");
      }
      // Handle response, store token, redirect user, etc.
    } catch (error) {
      console.error("Registration error", error.response.data);
      setError(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };
  // Function to validate email
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Function to validate phone number
  const isValidPhoneNumber = (phoneNumber) => {
    return phoneNumber.length === 10 && !isNaN(phoneNumber);
  };
  const isValidPassword = (password) => {
    // Password should contain at least 1 uppercase letter
    const uppercaseRegex = /[A-Z]/;
    // Password should contain at least 1 lowercase letter
    const lowercaseRegex = /[a-z]/;
    // Password should contain at least 1 digit
    const digitRegex = /\d/;
    // Password should have a minimum length of 10 characters
    const minLength = 10;

    return (
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      password.length >= minLength
    );
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }} >
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Contact Number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          label="Bio"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isFarmer}
              onChange={(e) => setIsFarmer(e.target.checked)}
              name="isFarmer"
            />
          }
          label="I am a farmer and I want to sell my produce on this website."
        />
        {isFarmer && (
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        )}
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
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;
