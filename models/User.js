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
      type: String, // e.g., "/uploads/1681234567890-resume.pdf"
    }
  ],



});

module.exports = mongoose.model("User", userSchema);
