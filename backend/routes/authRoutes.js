
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
    register,
    login,
    getProfile,
    updateProfile
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
