const express = require("express");
const connectDB = require("./database");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, GatherGro!");
});
// Connect to Database
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
