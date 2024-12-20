import React, { useState } from "react";
import authService from "../services/authenticationService";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Checkbox, FormControlLabel, Box, Link } from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});


const Register = () => {
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

        if (!isValidPassword(password)) {
            setError(
                "Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 10 characters long."
            );
            return;
        }

        if (!isValidPhoneNumber(contact)) {
            setError("Please enter a valid 10-digit phone number.");
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
            // console.log("Response:", response);
            if (response.data.status) {
                toast.success(response.data.message);
                navigate("/login");
            }
            // Handle response, store token, redirect user, etc.
        } catch (e) {
            // console.error("Registration error", error.response.data);
            setError(
                e.response.data.message || "An error occurred. Please try again."
            );
            toast.success(error);
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
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4" sx={{ fontFamily: "Jost" }}>
                    Register
                </Typography>
                {/* <form onSubmit={handleSubmit}> */}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Contact Number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={contact}
                        required
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
                        required
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <FormControlLabel sx={{ fontFamily: "Jost" }}
                        control={
                            <Checkbox
                                checked={isFarmer}
                                onChange={(e) => setIsFarmer(e.target.checked)}
                                name="isFarmer"
                            />
                        }
                        label={<Typography variant="body1" sx={{ fontFamily: "Jost" }}>I am a farmer and I want to sell my products on this website.</Typography>}
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
                    <CustomButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Register
                    </CustomButton>
                    {/* </form> */}
                </Box>
                <Typography mt={1} variant="body2" align="center" sx={{ fontFamily: "Jost" }}>
                    Already have an account?
                    <Link component="button" onClick={() => {
                        navigate("/login");
                    }}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container >
    );
}

export default Register;
