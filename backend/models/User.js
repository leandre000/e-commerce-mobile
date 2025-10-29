const pool = require('../config/database');
const bcrypt = require('bcryptjs');
// Import database pool and bcrypt for password hashing

class User {
  static async create({ firstName, lastName, email, password, age }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      // Hash password with 10 salt rounds (2^10 iterations)
      // Never store plain text passwords!
      
      const query = `
        INSERT INTO users (first_name, last_name, email, password, age)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, age, created_at
      `;
      // SQL query with placeholders ($1, $2, etc.)
      // RETURNING clause returns the inserted row
      
      const result = await pool.query(query, [
        firstName,
        lastName,
        email.toLowerCase(),  // Normalize email to lowercase
        hashedPassword,
        age
      ]);
      // Execute query with parameterized values (prevents SQL injection)
      
      return result.rows[0];
      // Return first row (the newly created user)
    } catch (error) {
      throw error;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
    // Securely compare plain password with hashed password
    // Returns true if match, false otherwise
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

  static async findById(id) {
    try {
      const query = 'SELECT id, first_name, last_name, email, age, created_at FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

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