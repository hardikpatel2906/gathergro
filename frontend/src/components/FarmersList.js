import { useEffect, useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
    margin: "5px 0",
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    },
});

const FarmersList = () => {
    const [farmers, setFarmers] = useState([])

    useEffect(() => {
        const fetchFarmers = async () => {
            const farmersList = await axios.get("http://localhost:5000/api/farmersList");
            if (farmersList.data.status) {
                setFarmers(farmersList.data.response)
            }
        }
        fetchFarmers()
    }, [])


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "5px",
            border: "1px solid black",
            borderRadius: "5px",
            height: "auto",
            padding: "10px"
        }}>

            <Typography variant="h6" sx={{ fontFamily: "Jost", alignSelf: "flex-start", marginBottom: "10px" }}>Our Farmers</Typography>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    width: "100%",
                    justifyItems: "center"
                }}
            >
                {farmers.slice(0, 9).map((farmer, index) => (
                    <div
                        key={index}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <Avatar
                            alt="User Avatar"
                            sx={{ cursor: "pointer", width: 56, height: 56 }}
                            src={farmer.profilePhoto}
                        >
                            {(!farmer.profilePhoto && farmer.username) ? farmer.username.charAt(0).toUpperCase() : ""}
                        </Avatar>
                        <Typography
                            align="center"  
                            sx={{
                                fontFamily: "Jost",
                                maxWidth: "80px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {farmer.username}
                        </Typography>
                    </div>
                ))}
            </div>

            <CustomButton>View All</CustomButton>
        </div>
    )
};

export default FarmersList;