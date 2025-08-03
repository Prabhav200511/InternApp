const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure the Cloudinary SDK with your credentials from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer-storage-cloudinary
// This tells multer to upload files to a 'resumes' folder in your Cloudinary account
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes', // The name of the folder in Cloudinary
    allowed_formats: ['pdf'], // Allow only PDF files
  },
});

// Create the multer instance configured with Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload; // Export the configured multer instance