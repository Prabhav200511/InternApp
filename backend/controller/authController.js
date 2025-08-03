const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, adminCode } = req.body;

    let role = 'intern'; // Default role

    // Check if an admin code was provided
    if (adminCode) {
      if (adminCode === process.env.ADMIN_SECRET_CODE) {
        role = 'admin'; // If code is correct, set role to admin
      } else {
        return res.status(401).json({ error: 'Invalid Admin Code.' });
      }
    }

    // Create the user with the determined role
    const user = await User.create({ name, email, password, role });

    // ... (the rest of the function remains the same)
    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    // Check for duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    res.status(400).json({ error: err.message });
  }
};
// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password were even provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }

    // 2. Find the user in the database
    const user = await User.findOne({ email });

    // 3. IMPORTANT: Check if the user exists *before* doing anything else
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' }); // Use 401 for security
    }

    // 4. Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // 5. If everything is okay, create and send the token
    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.json({ user: { name: user.name, email: user.email, role: user.role } });

  } catch (error) {
    // This will catch any other unexpected errors and prevent a server crash
    console.error('LOGIN ERROR:', error); // Log the actual error on the backend
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

// GET APPLICANTS (for admin)
exports.getApplicants = async (req, res) => {
  try {
    const applicants = await User.find({ role: 'intern' }).select('-password');
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching applicants.' });
  }
};