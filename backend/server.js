const express = require("express");
const connectDB = require("./dbConnection/database");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello, GatherGro!");
});
// Connect to Database
connectDB();
const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
