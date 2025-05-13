const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  documents: [
    {
      fileName: { type: String, required: true },
      fileUrl: { type: String, required: true },
      fileType: { type: String, enum: ["pdf", "certification"], default: "pdf" },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);