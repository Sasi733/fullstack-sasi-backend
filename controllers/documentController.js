// controllers/documentController.js
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadDocument = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const userEmail = req.body.email;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // VERY IMPORTANT for PDFs
      folder: "sasi-docs",
    });

    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.documents.push(result.secure_url); // store the Cloudinary file URL
    await user.save();

    fs.unlinkSync(req.file.path); // cleanup local

    res.status(200).json({
      message: "File uploaded and saved to user",
      fileUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
