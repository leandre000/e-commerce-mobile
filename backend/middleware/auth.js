const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Get Authorization header from request
    // Format: "Bearer <token>"
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'No token provided. Authorization denied.'
      });
    }
    // Return 401 Unauthorized if no header
    
    const token = authHeader.split(' ')[1];
    // Extract token by splitting "Bearer <token>" and taking second part
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verify token signature and decode payload
    // Throws error if token is invalid or expired
    
    req.user = decoded;
    // Attach decoded user data to request object
    // Makes user info available in route handlers
    
    next();
    // Continue to next middleware/route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token is invalid or expired. Authorization denied.'
    });
  }
};