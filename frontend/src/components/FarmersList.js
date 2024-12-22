import { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import axios from "axios";

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
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop:"5px" }}>
            <div style={{margin:"0 10px", border:"1px solid black"}}>
                <Typography>All Farmers</Typography>
            </div>
            {farmers.map((farmer) => (
                <div>
                    <Avatar
                        alt="User Avatar"
                        sx={{ cursor: "pointer", margin: "2px 10px" }}
                    >
                        {farmer.username.charAt(0)}
                    </Avatar>
                    <Typography>{farmer.username}</Typography>
                </div>
            ))}
        </div>
    )
};

export default FarmersList;