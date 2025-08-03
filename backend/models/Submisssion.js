const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // Personal Info
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  
  // Education
  educationLevel: { type: String },
  courseAndCollege: { type: String },

  // Skills & Links
  skills: { type: [String], default: [] }, // An array of strings for skills
  resumePath: { type: String, required: true }, // We will store the path to the uploaded PDF
  linkedIn: { type: String },
  github: { type: String },

  // Motivation
  motivation: { type: String },

  // Link to the user who submitted
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);