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
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      // Handle error
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
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
