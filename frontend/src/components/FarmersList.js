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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", margin: "5px", border: "1px solid black", borderRadius: "5px", height: "40vh" }}>
            <div
                style={{
                    margin: "0 10px",
                    // border: "1px solid black",
                    display: "flex",
                    padding: "10px",
                    alignItems: "center"
                }}
            >
                <Typography variant="h6" sx={{ fontFamily: "Jost", alignSelf: "flex-start" }}>Farmers</Typography>
            </div>
            {farmers.map((farmer) => (
                <div>
                    <Avatar
                        alt="User Avatar"
                        sx={{ cursor: "pointer"}}
                    >
                        {farmer.username.charAt(0)}
                    </Avatar>
                    <Typography align="center" sx={{ fontFamily: "Jost" }}>{farmer.username}</Typography>
                </div>
            ))}
            <CustomButton>View All</CustomButton>
        </div>
    )
};

export default FarmersList;