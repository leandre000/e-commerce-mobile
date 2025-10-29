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
}