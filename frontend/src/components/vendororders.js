import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const VendorOrders = () => {
    const vendorId = localStorage.getItem("userid"); 
    console.log(vendorId);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios.get(
          `http://localhost:5000/api/ordersByVendor?vendorId=${vendorId}`
      );
      if (result.data.status) {
        setOrders(result.data.response);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    // Find the order by ID and update its status locally
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const saveStatusUpdate = async (orderId, newStatus) => {
    // Call API to save the status update
    try {
      await axios.post(`http://localhost:5000/api/updateOrderStatus`, {
        orderId,
        newStatus,
      });
      alert("Order status updated successfully");
    } catch (error) {
      alert("Failed to update order status");
    }
  };

  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow key={row._id}>
          <TableCell>{row.orderDate.split("T")[0]}</TableCell>
          <TableCell>
            <Select
              value={row.status}
              onChange={(e) => handleStatusChange(row._id, e.target.value)}
              fullWidth
            >
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </TableCell>
          <TableCell>{row.totalPrice.toFixed(2)}</TableCell>
          <TableCell>{row.addressLine}</TableCell>
          <TableCell>{row.city}</TableCell>
          <TableCell>{row.pincode}</TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveStatusUpdate(row._id, row.status)}
            >
              Save
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Items
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>ProductName</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total price($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.orderedItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          <img
                            src={`http://localhost:5000/product_images/${item.image}`}
                            width={50}
                            height={50}
                            alt={item.productName}
                          />
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Typography variant="h4" mt={2} mb={2}>
        Vendor Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VendorOrders;
