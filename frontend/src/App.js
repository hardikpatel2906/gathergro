import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* You can add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
