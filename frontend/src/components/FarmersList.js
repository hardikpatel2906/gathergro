import { useEffect, useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
    marginLeft: "10px",
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
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "5px" }}>
            <div style={{ margin: "0 10px", border: "1px solid black" }}>
                <Typography variant="h6" sx={{ fontFamily: "Jost" }}>Farmers</Typography>
            </div>
            {farmers.map((farmer) => (
                <div>
                    <Avatar
                        alt="User Avatar"
                        sx={{ cursor: "pointer", margin: "2px 10px" }}
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