import { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, IconButton, Collapse, Box } from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Order = () => {
    const userId = localStorage.getItem("userid")

    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            const result = await axios.get(`http://localhost:5000/api/listOrdersByUser?userId=${userId}`);
            if (result.data.status) {
                setOrders(result.data.response);
            }
        };
        fetchOrders();
    }, []);


    const Row = ({ row }) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <TableRow
                    key={row._id}
                >
                    <TableCell component="th" scope="row">
                        {row.orderDate.split('T')[0]}
                    </TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.totalPrice.toFixed(2)}</TableCell>
                    <TableCell align="center">{row.addressLine}</TableCell>
                    <TableCell align="center">{row.city}</TableCell>
                    <TableCell align="center">{row.pincode}</TableCell>
                    <TableCell align="center">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Items
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">ProductName</TableCell>
                                            <TableCell align="center">Image</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="center">Total price($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.orderedItems.map((item) => (
                                            <TableRow >
                                                <TableCell align="center" component="th" scope="row">
                                                    {item.productName}
                                                </TableCell>
                                                <TableCell align="center"><img src={`http://localhost:5000/product_images/${item.image}`} width={50} height={50} /></TableCell>
                                                <TableCell align="center">{item.price}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.totalPrice}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }


    return (
        <>
            <Typography variant="h4" align="center" sx={{ fontFamily: "Jost", margin: "10px 0" }}>
                My Orders
            </Typography>
            <TableContainer component={Paper} sx={{ width: '90%', margin: '0 auto' }}>
                <Table size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Total Amount</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Pincode</TableCell>
                            <TableCell align="center">Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <Row row={row} />
                        ))}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default Order;