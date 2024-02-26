const express = require("express");
const connectDB = require("./dbConnection/database");
const cors = require("cors");
const fs = require("fs");

const app = express();
const routes = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static('./assets'));
// Define routes
// app.use("/api/auth", require("./routes/authRoutes")); // Mount authRoutes
app.use(routes);


app.get("/", (req, res) => {
  res.send("Hello, GatherGro!");
});
// Connect to Database
connectDB();
const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

if (!fs.existsSync('./assets')) {
  fs.mkdirSync('./assets')
}

if (!fs.existsSync('./assets/product_images')) {
  fs.mkdirSync('./assets/product_images')
}