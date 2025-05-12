const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { uploadDocument, getUserDocuments } = require("../controllers/documentController");

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sasi-docs",
    resource_type: "raw", // required to support PDFs
    format: async (req, file) => "pdf",
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("document"), uploadDocument);
router.get("/user/:email", getUserDocuments);

module.exports = router;
