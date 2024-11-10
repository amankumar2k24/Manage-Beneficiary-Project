const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const beneficiary = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = process.env.PORT || 3000;

app.use("/api", beneficiary);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoDBConnected = async () => {
  try {
    await mongoose.connect(process.env.mongoDbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

mongoDBConnected();
