// Main Server File
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'MobCommerce API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

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