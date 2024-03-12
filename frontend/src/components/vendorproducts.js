import { useState, useEffect } from "react";
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)({
    margin: "10px",
    background: "#B4D9B6",
    color: 'black',
});
const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'productName', headerName: 'Product name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 90 },
    { field: 'description', headerName: 'Description', width: 130 }
];

const VendorProducts = () => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userid")

    const [userProductList, setUserProductList] = useState([]);

    const getUserProductData = async () => {
        const result = await axios.get(`http://localhost:5000/api/listProductsByUser?userId=${userId}`);
        if (result.data.status) {
            setUserProductList(result.data.response);
        }
    }

    useEffect(() => {
        getUserProductData();
    }, []);

    const handleProductDelete = async (productId) => {
        const response = await axios.delete(`http://localhost:5000/api/deleteProduct?productId=${productId}`);
        if (response.data.status) {
            toast.success(response.data.message);
            navigate("/myproducts");
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <>
            <Typography variant="h5" mt={2}>
                Vendor Products
            </Typography>
            <div style={{ width: '90%', display: "flex", justifyContent: 'flex-end', margin: '0 auto' }}>
                <CustomButton color="inherit" href="/addproduct">
                    Add Product
                </CustomButton>
            </div>
            <TableContainer component={Paper} sx={{ width: '90%', margin: '0 auto' }}>
                <Table size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Product Image</TableCell>

                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userProductList.map((row) => (
                            <TableRow
                                key={row._id}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.productName}
                                </TableCell>
                                <TableCell align="center"><img src={`http://localhost:5000/product_images/${row.productImages}`} width={50} height={50} /></TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell width={500}>{row.description}</TableCell>
                                <TableCell align="center">
                                    <Button>View</Button>
                                    <Button>Edit</Button>
                                    <Button onClick={() => handleProductDelete(row._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};
export default VendorProducts;