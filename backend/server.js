const express = require("express");
const connectDB = require("./dbConnection/database");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/auth", require("./routes/authRoutes")); // Mount authRoutes

app.get("/", (req, res) => {
  res.send("Hello, GatherGro!");
});
// Connect to Database
connectDB();
const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
