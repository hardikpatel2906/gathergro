import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
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
        <div>
            {farmers.map((farmer) => (
                <Avatar
                    alt="User Avatar"
                    sx={{ cursor: "pointer", margin: "10px" }}
                >
                    {farmer.username.charAt(0)}
                </Avatar>
            ))}
        </div>
    )
};

export default FarmersList;