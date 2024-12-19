import React, { useState } from "react";
import authService from "../services/authenticationService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Link } from "@mui/material";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { styled } from "@mui/material/styles";


const CustomLogoImg = styled("img")({
    height: "150px",
    marginBottom: "20px"
});


const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

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
                toast.success(response.data.message);
                const token = response.data.response.token;

                // Set username and role to local-storage
                const decoded = jwtDecode(token);

                localStorage.setItem("username", decoded.username);
                localStorage.setItem("role", decoded.role);
                localStorage.setItem("userid", decoded._id);
                localStorage.setItem("authToken", token);
                navigate("/");
            }
            // Handle response, store token, redirect user, etc.
        } catch (error) {
            toast.error(error.response.data.message);

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
                <CustomLogoImg src="/gather-gro-home.png" alt="Custom Logo" onClick={() => navigate("/")} />
                <Typography component="h1" variant="h4" sx={{ fontFamily: "Jost" }}>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 350, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                    <CustomButton
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </CustomButton>
                    <Typography variant="body2" align="center" sx={{ fontFamily: "Jost" }}>
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
