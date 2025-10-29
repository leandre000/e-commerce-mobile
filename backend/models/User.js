

const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  
  static async create({ firstName, lastName, email, password, age }) {
    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      
      const query = `
        INSERT INTO users (first_name, last_name, email, password, age)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, age, created_at
      `;
      
      
      const result = await pool.query(query, [
        firstName,
        lastName,
        email.toLowerCase(), 
        hashedPassword,
        age
      ]);
      
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

 
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email.toLowerCase()]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const query = 'SELECT id, first_name, last_name, email, age, created_at FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    // bcrypt.compare securely compares plain text with hashed password
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user password
  static async updatePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const query = 'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
      await pool.query(query, [hashedPassword, userId]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get all users (admin function)
  static async getAll() {
    try {
      const query = 'SELECT id, first_name, last_name, email, age, created_at FROM users ORDER BY created_at DESC';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;