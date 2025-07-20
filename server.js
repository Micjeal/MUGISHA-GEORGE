require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, testConnection, initializeDatabase } = require('./database/db');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static('.'));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Test database connection on startup
async function startServer() {
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('Failed to connect to database. Exiting...');
        process.exit(1);
    }
    
    await initializeDatabase();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Form submission endpoint
app.post('/api/contact', 
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('phone').trim().notEmpty().withMessage('Phone number is required')
            .matches(/^[0-9+\-\s()]{10,}$/).withMessage('Please enter a valid phone number'),
        body('service').trim().notEmpty().withMessage('Please select a service'),
        body('message').trim().notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, phone, service, message } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent');
        const referrer = req.get('Referer');

        const connection = await pool.getConnection();
        try {
            console.log('Received form submission:', { name, phone: '***', service, message: message.substring(0, 20) + '...' });
            await connection.beginTransaction();

            // Insert contact
            const [contactResult] = await connection.query(
                'INSERT INTO contacts (name, phone, service, message, ip_address) VALUES (?, ?, ?, ?, ?)',
                [name, phone, service, message, ipAddress]
            );

            // Insert metadata
            await connection.query(
                'INSERT INTO form_metadata (contact_id, user_agent, referrer) VALUES (?, ?, ?)',
                [contactResult.insertId, userAgent, referrer]
            );

            await connection.commit();
            
            res.status(201).json({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.'
            });
        } catch (error) {
            await connection.rollback();
            console.error('Error processing form submission:', {
                message: error.message,
                stack: error.stack,
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                sqlState: error.sqlState,
                sql: error.sql
            });
            res.status(500).json({
                success: false,
                message: 'An error occurred while processing your submission.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        } finally {
            connection.release();
        }
    }
);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the server
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
