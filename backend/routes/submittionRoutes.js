// backend/routes/submissionRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions that contain the logic
const { 
  createSubmission, 
  getAllSubmissions 
} = require('../controller/submissionController');

// Import middleware
const protect = require('../middleware/protectRoute'); // Your authentication middleware
const admin = require('../middleware/admin');     // Your admin role-checking middleware
const upload = require('../config/cloudinary'); // Your pre-configured Cloudinary upload middleware


router.post('/', protect, upload.single('resume'), createSubmission);


router.get('/', protect, admin, getAllSubmissions);


module.exports = router;