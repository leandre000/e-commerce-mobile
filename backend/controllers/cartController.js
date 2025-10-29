// Cart Controller
// Handles shopping cart operations

const Cart = require('../models/Cart');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    // req.user.userId is set by auth middleware
    const userId = req.user.userId;

    const items = await Cart.getCartItems(userId);
    const count = await Cart.getCartCount(userId);

    res.json({
      success: true,
      data: {
        items,
        count
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching cart'
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, productTitle } = req.body;

    if (!productId || !productTitle) {
      return res.status(400).json({
        success: false,
        error: 'Product ID and title are required'
      });
    }

    await Cart.addItem(userId, productId, productTitle);
    
    const items = await Cart.getCartItems(userId);
    const count = await Cart.getCartCount(userId);

    res.json({
      success: true,
      message: 'Item added to cart',
      data: {
        items,
        count
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error adding to cart'
    });
  }
};

// Increment item quantity
exports.incrementItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    await Cart.incrementItem(userId, productId);
    
    const items = await Cart.getCartItems(userId);
    const count = await Cart.getCartCount(userId);

    res.json({
      success: true,
      message: 'Item quantity incremented',
      data: {
        items,
        count
      }
    });
  } catch (error) {
    console.error('Increment item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error incrementing item'
    });
  }
};

// Decrement item quantity
exports.decrementItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    await Cart.decrementItem(userId, productId);
    
    const items = await Cart.getCartItems(userId);
    const count = await Cart.getCartCount(userId);

    res.json({
      success: true,
      message: 'Item quantity decremented',
      data: {
        items,
        count
      }
    });
  } catch (error) {
    console.error('Decrement item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error decrementing item'
    });
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    await Cart.removeItem(userId, productId);
    
    const items = await Cart.getCartItems(userId);
    const count = await Cart.getCartCount(userId);

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        items,
        count
      }
    });
  } catch (error) {
    console.error('Remove item error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error removing item'
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Cart.clearCart(userId);

    res.json({
      success: true,
      message: 'Cart cleared',
      data: {
        items: [],
        count: 0
      }
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error clearing cart'
    });
  }
};