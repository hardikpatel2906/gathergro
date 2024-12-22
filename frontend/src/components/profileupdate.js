import React, { useState } from "react";
import authService from "../services/authenticationService";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";


const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});

const ProfileUpdate = () => {
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidPhoneNumber(contact)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }
        try {
            const userId = localStorage.getItem("userid");
            const response = await authService.updateProfile({
                username,
                contact,
                bio,
                userId,
            });
            if (response.data.status) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setError(
                error.response.data.message || "An error occurred. Please try again."
            );
        }
    };

    // Function to validate phone number
    const isValidPhoneNumber = (phoneNumber) => {
        return phoneNumber.length === 10 && !isNaN(phoneNumber);
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
                    Update Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <CustomButton type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
                        Update Profile
                    </CustomButton>
                </Box>
            </Box>
        </Container>
    );
}

export default ProfileUpdate;
