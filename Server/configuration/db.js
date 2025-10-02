const mongoose = require("mongoose");

const { PORT, MONGO_URI } = require("./config.js");

exports.connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// console.log(PORT, MONGO_URI);
