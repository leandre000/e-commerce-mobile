// Main Server File
// Entry point for the backend application

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow frontend to make requests from different origin
app.use(cors({
  origin: '*', // In production, specify exact origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser - Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'MobCommerce API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// 404 handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log(`   MobCommerce Backend API`);
  console.log('   ========================================');
  console.log(`   Server running on: http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('   ========================================');
  console.log('\n📋 Available Endpoints:');
  console.log('   GET    /health');
  console.log('   POST   /api/auth/register');
  console.log('   POST   /api/auth/login');
  console.log('   POST   /api/auth/forgot-password');
  console.log('   GET    /api/auth/profile');
  console.log('   GET    /api/auth/users');
  console.log('   GET    /api/cart');
  console.log('   POST   /api/cart/add');
  console.log('   POST   /api/cart/increment');
  console.log('   POST   /api/cart/decrement');
  console.log('   DELETE /api/cart/remove');
  console.log('   DELETE /api/cart/clear');
  console.log('   ========================================\n');
});

module.exports = app;