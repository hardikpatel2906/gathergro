import { useState, useEffect } from "react";
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const CustomButton = styled(Button)({
    margin: "10px",
    color: "green",
});
const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'productName', headerName: 'Product name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 90 },
    { field: 'description', headerName: 'Description', width: 130 }
];

const VendorProducts = () => {
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

    const handleProductDelete = async(productId) => {
        const result = await axios.delete(`http://localhost:5000/api/deleteProduct?productId=${productId}`);
    }

    return (
        <>
            <h1>Vendor Products</h1>
            <CustomButton color="inherit" href="/addproduct">
                Add Product
            </CustomButton>
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
                                <TableCell >{row.description}</TableCell>
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