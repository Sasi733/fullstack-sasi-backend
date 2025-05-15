const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Use Render's persistent temporary directory
const uploadPath = path.join("/tmp", "uploads");

// Create the folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

module.exports = upload;
