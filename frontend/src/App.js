import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import ProfileUpdate from "./components/profileupdate";
import ChangePassword from "./components/changepassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import VendorProducts from "./components/vendorproducts";
import AddProduct from "./components/addproduct";
import SingleProduct from "./components/singleproduct";
import { useDispatch } from 'react-redux';
import { cartActions } from "./store/cart-slice";
import Cart from "./components/cart";
import AboutUs from "./components/aboutus";
import CheckoutForm from "./components/chekoutform";
import Order from "./components/order";
import UpdateProduct from "./components/updateproduct";
import VendorOrders from "./components/vendororders";
import PaymentSuccess from "./components/paymentsuccess";
import FarmersList from "./components/FarmersList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = () => {
      const cartState = JSON.parse(localStorage.getItem('cart'));
      if (cartState) {
        dispatch(cartActions.replaceCart({ items: cartState.items, totalQuantity: cartState.totalQuantity }))
      }
    }
    fetchCart();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <FarmersList /> */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/myproducts" element={<VendorProducts />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/myorders" element={<Order />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/vendororders" element={<VendorOrders />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </Router>
  );
}

export default App;
