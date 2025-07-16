import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Define storage locations
const AVATAR_DIR = "../backend/src/uploads/avatars";
const DOCUMENTS_DIR = "../backend/src/uploads/documents";

// Ensure directories exist
[AVATAR_DIR, DOCUMENTS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Put avatars into avatar folder, docs into documents folder
    if (file.fieldname === "avatar") {
      cb(null, AVATAR_DIR);
    } else if (
      file.fieldname === "resume" ||
      file.fieldname === "coverLetter" ||
      file.fieldname === "cv"
    ) {
      cb(null, DOCUMENTS_DIR);
    } else {
      // Reject unexpected fields
      cb(new Error("Invalid field name"), false);
    }
  },
  filename: function (req, file, cb) {
    // Generate a unique filename preserving file extension
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName = uuidv4() + extension;
    cb(null, uniqueName);
  },
});

// Allowed file types validation
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const allowedDocTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (file.fieldname === "avatar") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid avatar file type. Only jpeg, jpg, png allowed."));
    }
  } else if (
    file.fieldname === "resume" ||
    file.fieldname === "coverLetter" ||
    file.fieldname === "cv"
  ) {
    if (allowedDocTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid document file type. Only PDF and Word documents allowed."
        )
      );
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};

// Limits: Maximum 5 MB per file
const limits = {
  fileSize: 100 * 1024 * 1024,
};

// Create and export multer middleware configured with storage, fileFilter, and limits
const multerFileUpload = multer({
  storage,
  fileFilter,
  limits,
}).fields([
  { name: "avatar", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

export default multerFileUpload;
