import multer from "multer";

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory to store the uploaded image
    cb(null, "Public/Temp");
  },
  filename: (req, file, cb) => {
    // Extract file extension and save as "imageForBackend.extension"
    const fileExtension = file.mimetype.split("/")[1]; 
    cb(null, `imageForBackend.${fileExtension}`);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject non-image files
  }
};

// Set up multer with storage, fileFilter, and file size limit
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Export a single image upload handler
export const uploadSingleImage = upload.single("productImage");
