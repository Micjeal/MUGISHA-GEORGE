const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Database connection details:', {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME || 'contact_form_db',
    password: process.env.DB_PASSWORD ? '***' : 'Not set'
});

// Create a connection pool to the database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'contact_form_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true // Allow multiple statements for initialization
});

// Test the database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        return false;
    }
}

// Initialize the database tables
async function initializeDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Connected to MySQL database');

        // First, drop existing tables if they exist (in development)
        await connection.query(`
            DROP TABLE IF EXISTS form_metadata;
            DROP TABLE IF EXISTS contacts;
        `).catch(err => console.log('No tables to drop or error dropping tables:', err.message));

        console.log('Creating tables...');
        
        // Create contacts table
        await connection.query(`
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
        `);
        console.log('Created contacts table');
        
        // Create form_metadata table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS form_metadata (
                id INT AUTO_INCREMENT PRIMARY KEY,
                contact_id INT,
                user_agent TEXT,
                referrer TEXT,
                FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('Created form_metadata table');
        
        // Verify tables were created
        const [tables] = await connection.query('SHOW TABLES');
        console.log('Available tables:', tables.map(t => Object.values(t)[0]));
        
        return true;
    } catch (error) {
        console.error('Error initializing database:', {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState,
            sql: error.sql
        });
        return false;
    } finally {
        if (connection) {
            connection.release();
            console.log('Database connection released');
        }
    }
}

module.exports = {
    pool,
    testConnection,
    initializeDatabase
};
