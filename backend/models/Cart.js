

const pool = require('../config/database');

class Cart {
 
  static async getCartItems(userId) {
    try {
      const query = `
        SELECT id, product_id, product_title, quantity, created_at, updated_at
        FROM cart_items
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Add item to cart or increment quantity if exists
  static async addItem(userId, productId, productTitle) {
    try {
      // Check if item already exists in cart
      const checkQuery = 'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2';
      const existing = await pool.query(checkQuery, [userId, productId]);

      if (existing.rows.length > 0) {
        // Item exists, increment quantity
        const updateQuery = `
          UPDATE cart_items 
          SET quantity = quantity + 1, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = $1 AND product_id = $2
          RETURNING *
        `;
        const result = await pool.query(updateQuery, [userId, productId]);
        return result.rows[0];
      } else {
        // Item doesn't exist, insert new
        const insertQuery = `
          INSERT INTO cart_items (user_id, product_id, product_title, quantity)
          VALUES ($1, $2, $3, 1)
          RETURNING *
        `;
        const result = await pool.query(insertQuery, [userId, productId, productTitle]);
        return result.rows[0];
      }
    } catch (error) {
      throw error;
    }
  }

  // Increment item quantity
  static async incrementItem(userId, productId) {
    try {
      const query = `
        UPDATE cart_items 
        SET quantity = quantity + 1, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND product_id = $2
        RETURNING *
      `;
      const result = await pool.query(query, [userId, productId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Decrement item quantity
  static async decrementItem(userId, productId) {
    try {
      // First check current quantity
      const checkQuery = 'SELECT quantity FROM cart_items WHERE user_id = $1 AND product_id = $2';
      const current = await pool.query(checkQuery, [userId, productId]);

      if (current.rows.length === 0) {
        return null;
      }

      if (current.rows[0].quantity <= 1) {
        // Remove item if quantity would be 0
        return await this.removeItem(userId, productId);
      } else {
        // Decrement quantity
        const query = `
          UPDATE cart_items 
          SET quantity = quantity - 1, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = $1 AND product_id = $2
          RETURNING *
        `;
        const result = await pool.query(query, [userId, productId]);
        return result.rows[0];
      }
    } catch (error) {
      throw error;
    }
  }

  // Remove item from cart
  static async removeItem(userId, productId) {
    try {
      const query = 'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *';
      const result = await pool.query(query, [userId, productId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Clear entire cart
  static async clearCart(userId) {
    try {
      const query = 'DELETE FROM cart_items WHERE user_id = $1';
      await pool.query(query, [userId]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get cart count
  static async getCartCount(userId) {
    try {
      const query = 'SELECT COALESCE(SUM(quantity), 0) as count FROM cart_items WHERE user_id = $1';
      const result = await pool.query(query, [userId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart;