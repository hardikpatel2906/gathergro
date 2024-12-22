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


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }
        if (!isValidPassword(newPassword)) {
            setError(
                "Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 10 characters long."
            );
            return;
        }
        try {
            const userId = localStorage.getItem("userid");
            const response = await authService.changePassword({
                currentPassword,
                newPassword,
                userId,
            });
            if (response.data.status) {
                navigate("/");
            }
        } catch (error) {
            setError(
                error.response.data.message || "An error occurred. Please try again."
            );
        }
    };

    // Function to validate password
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
                    Change Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField
                        label="Current Password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={currentPassword}
                        required
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={newPassword}
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm New Password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <CustomButton type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
                        Change Password
                    </CustomButton>
                </Box>
            </Box>
        </Container>
    );
}

export default ChangePassword;
