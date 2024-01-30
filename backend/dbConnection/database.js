const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectionString = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
