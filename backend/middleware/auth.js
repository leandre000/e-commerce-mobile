// Authentication Middleware
// Protects routes by verifying JWT tokens

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'No token provided. Authorization denied.'
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token format. Authorization denied.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request object
    // This makes user data available in route handlers
    req.user = decoded;

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({
      success: false,
      error: 'Token is invalid or expired. Authorization denied.'
    });
  }
};

module.exports = authMiddleware;