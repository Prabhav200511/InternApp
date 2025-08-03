const express = require('express');
const { signup, login, getProfile, logout, getApplicants } = require('../controller/authController');
const protectRoute = require('../middleware/protectRoute');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login); // This line requires 'login' to be a function
router.get('/me', protectRoute, getProfile);
router.post('/logout', logout);
router.get('/applicants', protectRoute, admin, getApplicants);

module.exports = router;