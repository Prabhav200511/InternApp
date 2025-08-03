const Submission = require('../models/Submisssion');
exports.createSubmission = async (req, res) => {
  try {
    // Destructure all text fields from the request body
    const { 
      fullName, email, phoneNumber, educationLevel, 
      courseAndCollege, skills, linkedIn, github, motivation 
    } = req.body;

    // Multer adds a 'file' object to the request if a file was uploaded.
    // We check if the file exists, which is a required field.
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Resume file is required.' });
    }

    // Create the new submission document in the database
    const submission = await Submission.create({
      fullName, email, phoneNumber, educationLevel, courseAndCollege,
      // The skills are sent as a comma-separated string, so we split them into an array
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
      linkedIn, github, motivation,
      // 'req.file.path' is the public URL of the uploaded file provided by multer-storage-cloudinary
      resumePath: req.file.path, 
      // 'req.user.id' is available from our 'protect' authentication middleware
      submittedBy: req.user.id,
    });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Get all submissions
 * @route   GET /api/submissions
 * @access  Private (Admins only)
 */
exports.getAllSubmissions = async (req, res) => {
  try {
    // Fetch all submissions from the database
    // Use .populate() to replace the 'submittedBy' ID with the user's name and email
    const submissions = await Submission.find({}).populate('submittedBy', 'name email').sort({ createdAt: -1 });
    
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Fetch All Submissions Error:", error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};