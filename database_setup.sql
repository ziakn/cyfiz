-- Create the database
CREATE DATABASE cyfiz_db;

-- Use the database
USE cyfiz_db;

-- Create admin_users table
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_modules table
CREATE TABLE admin_modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  status ENUM('draft', 'published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a sample admin user (password is 'admin123' hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, role) VALUES
('admin@gmail.com', '$2a$10$APcwMZG3ObgJ6GD/3EQ08eNRS4H46TXHLMXdayEYL/EEwrKvlAxjO', 'admin');

-- Login:
-- Email: admin@gmail.com
-- Password: admin123
