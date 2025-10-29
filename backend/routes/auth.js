
// Defines all auth-related API endpoints

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes (no authentication required)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Protected routes (authentication required)
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/users', authMiddleware, authController.getAllUsers);

module.exports = router;