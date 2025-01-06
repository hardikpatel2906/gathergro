import React, { useState } from "react";
import authService from "../services/authenticationService";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DeleteOutline } from "@mui/icons-material"


const CustomButton = styled(Button)({
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});

const styles = {
    textField: {
        '& .MuiInputBase-root': {
            fontFamily: 'Jost',
        },
        '& .MuiInputLabel-root': {
            fontFamily: 'Jost',
        }
    }
}

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

    const [uploadedImage, setUploadedImage] = useState(null);

    // Handle file selection
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
        }
    };

    //Handle Delete Profile Image
    const handleDeleteProfileImage = () => {
        setUploadedImage(null);
    }


    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4" sx={{ fontFamily: "Jost" }}>
                    Profile
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        // flexDirection: "row"
                        justifyContent: "space-evenly",
                        // alignItems: "flex-start", // Ensure boxes align at the top
                        width: "100%", // Ensure parent container takes full width
                        gap: 2,
                    }}
                >
                    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                maxWidth: "300px",
                                margin: "auto",
                                textAlign: "center",
                            }}
                        >
                            {/* Display uploaded image or placeholder */}
                            <Avatar
                                src={uploadedImage || "https://via.placeholder.com/150"}
                                alt="Uploaded Preview"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    marginBottom: 2,
                                }}
                            />

                            <Typography variant="body1" sx={{ fontFamily: "Jost" }}>
                                {uploadedImage ? "Your Uploaded Image" : "Upload a New Image"}
                            </Typography>

                            {/* Upload button */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                    textAlign: "center",
                                    margin: "auto",
                                }}
                            >
                                <CustomButton
                                    variant="contained"
                                    component="label"
                                >
                                    {uploadedImage ? "Change Image" : "Upload Image"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageUpload}
                                    />
                                </CustomButton>
                                <DeleteOutline onClick={handleDeleteProfileImage} />
                            </Box>
                        </Box>
                        <CustomButton>Update Profile Picture</CustomButton>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={username}
                            required
                            sx={styles.textField}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Contact Number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={contact}
                            required
                            sx={styles.textField}
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
                            sx={styles.textField}
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
            </Box>
        </Container>
    );
}

export default ProfileUpdate;
