import { useState, useEffect } from "react";
import { Button, Box, Popover, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Dialog, DialogTitle, DialogActions, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)({
    margin: "10px 0",
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
});

const CustomActionButton = styled(Button)({
    margin: "0 5px",
    background: "#27ae60",
    fontFamily: 'Jost',
    color: "white",
    ":hover": {
        background: "#0b873f"
    }
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
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [quantity, setQuantity] = useState("")

    const handlePopoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;


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
            setOpen(false);
            navigate("/myproducts");
        } else {
            toast.error(response.data.message);
        }
    }

    const handleDialogOpen = () => {
        setOpen(true)
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    const handleQuantitySubmit = async (productId) => {
        const updateQtyData = {
            userId: userId,
            productId: productId,
            quantity: quantity
        }
        const response = await axios.put("http://localhost:5000/api/increaseQuantity", updateQtyData);
        if (response.data.status) {
            toast.success(response.data.message);
            navigate("/myproducts");
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <>
            <Typography variant="h4" align="center" sx={{ fontFamily: "Jost", marginTop:"10px"}}>
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
                            <TableCell sx={{ fontFamily: "Jost" }}>Product Name</TableCell>
                            <TableCell align="center" sx={{ fontFamily: "Jost" }}>Product Image</TableCell>

                            <TableCell align="right" sx={{ fontFamily: "Jost" }}>Price</TableCell>
                            <TableCell align="right" sx={{ fontFamily: "Jost" }}>Quantity</TableCell>
                            <TableCell sx={{ fontFamily: "Jost" }}>Description</TableCell>
                            <TableCell align="center" sx={{ fontFamily: "Jost" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userProductList.map((row) => (
                            <TableRow
                                key={row._id}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontFamily: "Jost" }}>
                                    {row.productName}
                                </TableCell>
                                <TableCell align="center"><img src={row.productImages} width={50} height={50} /></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "Jost" }}>{row.price}</TableCell>
                                <TableCell align="right" sx={{ fontFamily: "Jost" }}>{row.quantity}</TableCell>
                                <TableCell width={500} sx={{ fontFamily: "Jost" }}>{row.description}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: "Jost" }}>
                                    <CustomActionButton onClick={handlePopoverClick}>Add Quantity</CustomActionButton>
                                    <Popover
                                        id={id}
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                margin: 4,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <form onSubmit={() => handleQuantitySubmit(row._id)}>
                                                <TextField type="number" label="Quantity" fullWidth margin="normal" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                                <Button color="success" type="submit">Add</Button>
                                                <Button color="error" onClick={handlePopoverClose}>Cancel</Button>
                                            </form>
                                        </Box>
                                    </Popover>
                                    <CustomActionButton onClick={() => { navigate(`/updateproduct/${row._id}`); }}>Edit</CustomActionButton>
                                    {/* <Button onClick={() => handleProductDelete(row._id)}>Delete</Button> */}
                                    <CustomActionButton onClick={handleDialogOpen}>Delete</CustomActionButton>
                                    <Dialog
                                        open={open}
                                        onClose={handleDialogClose}
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Are you sure you want to delete this item?"}
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleDialogClose}>No</Button>
                                            <Button onClick={() => handleProductDelete(row._id)} autoFocus>
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
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