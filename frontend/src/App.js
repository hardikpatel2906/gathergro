import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import ProfileUpdate from "./components/profileupdate";
import ChangePassword from "./components/changepassword";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          {/* You can add more routes here */}
        </Routes>
        <ToastContainer position="bottom-right" autoClose={false} />
      </div>
    </Router>
  );
}

export default App;
