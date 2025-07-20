-- Database schema for contact form submissions

-- Create the database (uncomment if you need to create the database)
-- CREATE DATABASE IF NOT EXISTS contact_form_db;
-- USE contact_form_db;

-- Create contacts table to store form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create a table to track additional metadata if needed
CREATE TABLE IF NOT EXISTS form_metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT,
    user_agent TEXT,
    referrer TEXT,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
