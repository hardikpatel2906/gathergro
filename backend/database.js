const mongoose = require("mongoose");
const coonectionString =
  "mongodb+srv://krushal:1234@cluster0.edkssvh.mongodb.net/GatherGro?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(coonectionString, {
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
