const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const documentRoutes = require("./routes/documentRoutes");


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/uploads", express.static("uploads")); // serve uploaded files





// Connect to DB and start server
const PORT = process.env.PORT || 5000;

console.log("Using Mongo URI:", process.env.MONGO_URI);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
