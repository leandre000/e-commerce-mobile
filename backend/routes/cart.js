
// Defines all cart-related API endpoints

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

// All cart routes require authentication
router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.post('/increment', authMiddleware, cartController.incrementItem);
router.post('/decrement', authMiddleware, cartController.decrementItem);
router.delete('/remove', authMiddleware, cartController.removeItem);
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;