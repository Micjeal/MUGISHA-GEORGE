require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool } = require('./database/db');
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

// Get all messages (admin only)
app.get('/api/messages', authenticateToken, async (req, res) => {
    try {
        const [messages] = await pool.query(`
            SELECT c.*, fm.user_agent, fm.referrer 
            FROM contacts c
            LEFT JOIN form_metadata fm ON c.id = fm.contact_id
            ORDER BY c.submission_date DESC
        `);
        
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Get a single message (admin only)
app.get('/api/messages/:id', authenticateToken, async (req, res) => {
    try {
        const [messages] = await pool.query(`
            SELECT c.*, fm.user_agent, fm.referrer 
            FROM contacts c
            LEFT JOIN form_metadata fm ON c.id = fm.contact_id
            WHERE c.id = ?
        `, [req.params.id]);
        
        if (messages.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        res.json(messages[0]);
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
});

// Mark message as read (admin only)
app.put('/api/messages/:id/read', authenticateToken, async (req, res) => {
    try {
        await pool.query('UPDATE contacts SET is_read = TRUE WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ error: 'Failed to update message status' });
    }
});

// Delete a message (admin only)
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        // First delete metadata to avoid foreign key constraint
        await connection.query('DELETE FROM form_metadata WHERE contact_id = ?', [req.params.id]);
        
        // Then delete the contact
        await connection.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
        
        await connection.commit();
        res.json({ success: true });
    } catch (error) {
        await connection.rollback();
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    } finally {
        connection.release();
    }
});

// Send reply to a message (admin only)
app.post('/api/messages/reply', authenticateToken, async (req, res) => {
    const { messageId, reply } = req.body;
    
    if (!messageId || !reply) {
        return res.status(400).json({ error: 'Message ID and reply content are required' });
    }
    
    try {
        // In a real app, you would send an email with the reply
        // For now, we'll just log it and update the message status
        console.log(`Sending reply for message ${messageId}:`, reply);
        
        // Mark as read and update with reply info
        await pool.query(
            'UPDATE contacts SET is_read = TRUE, replied_at = NOW() WHERE id = ?',
            [messageId]
        );
        
        // In a real app, send an email here
        // await sendEmail(reply, messageId);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending reply:', error);
        res.status(500).json({ error: 'Failed to send reply' });
    }
});

// Get message statistics (admin only)
app.get('/api/messages/count', authenticateToken, async (req, res) => {
    try {
        const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM contacts');
        const [[{ unread }]] = await pool.query('SELECT COUNT(*) as unread FROM contacts WHERE is_read = FALSE');
        
        res.json({ total, unread });
    } catch (error) {
        console.error('Error getting message count:', error);
        res.status(500).json({ error: 'Failed to get message count' });
    }
});

// Get all visitors (admin only)
app.get('/api/visitors', authenticateToken, async (req, res) => {
    const { limit = 50, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    
    try {
        // Get paginated visitors
        const [visitors] = await pool.query(
            'SELECT * FROM visitors ORDER BY visit_date DESC LIMIT ? OFFSET ?',
            [parseInt(limit), parseInt(offset)]
        );
        
        // Get total count for pagination
        const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM visitors');
        
        res.json({
            data: visitors,
            pagination: {
                total: parseInt(total),
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ error: 'Failed to fetch visitors' });
    }
});

// Get visitor statistics (admin only)
app.get('/api/visitors/count', authenticateToken, async (req, res) => {
    try {
        // Total visitors
        const [[{ total }]] = await pool.query('SELECT COUNT(DISTINCT ip_address) as total FROM visitors');
        
        // Today's visitors
        const [[{ today }]] = await pool.query(
            'SELECT COUNT(DISTINCT ip_address) as today FROM visitors WHERE DATE(visit_date) = CURDATE()'
        );
        
        // This month's visitors
        const [[{ thisMonth }]] = await pool.query(
            'SELECT COUNT(DISTINCT ip_address) as thisMonth FROM visitors WHERE MONTH(visit_date) = MONTH(CURRENT_DATE()) AND YEAR(visit_date) = YEAR(CURRENT_DATE())'
        );
        
        res.json({ total, today, thisMonth });
    } catch (error) {
        console.error('Error getting visitor count:', error);
        res.status(500).json({ error: 'Failed to get visitor count' });
    }
});

// Get visitor analytics (admin only)
app.get('/api/visitors/analytics', authenticateToken, async (req, res) => {
    try {
        // Visitors by date (last 30 days)
        const [byDate] = await pool.query(`
            SELECT 
                DATE(visit_date) as date, 
                COUNT(DISTINCT ip_address) as visitors,
                COUNT(*) as visits
            FROM visitors 
            WHERE visit_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
            GROUP BY DATE(visit_date)
            ORDER BY date ASC
        `);
        
        // Visitors by country
        const [byCountry] = await pool.query(`
            SELECT 
                country, 
                COUNT(DISTINCT ip_address) as visitors,
                COUNT(*) as visits
            FROM visitors 
            WHERE country IS NOT NULL AND country != 'Unknown'
            GROUP BY country
            ORDER BY visitors DESC
            LIMIT 10
        `);
        
        // Visitors by page
        const [byPage] = await pool.query(`
            SELECT 
                page_visited as page, 
                COUNT(DISTINCT ip_address) as visitors,
                COUNT(*) as visits
            FROM visitors 
            WHERE page_visited IS NOT NULL
            GROUP BY page_visited
            ORDER BY visits DESC
            LIMIT 10
        `);
        
        // Referrers
        const [referrers] = await pool.query(`
            SELECT 
                CASE 
                    WHEN referrer = 'Direct' THEN 'Direct'
                    WHEN referrer LIKE '%google.%' THEN 'Google'
                    WHEN referrer LIKE '%bing.%' THEN 'Bing'
                    WHEN referrer LIKE '%yahoo.%' THEN 'Yahoo'
                    WHEN referrer LIKE '%facebook.%' THEN 'Facebook'
                    WHEN referrer LIKE '%twitter.%' THEN 'Twitter'
                    WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
                    WHEN referrer LIKE '%instagram.%' THEN 'Instagram'
                    WHEN referrer LIKE '%youtube.%' THEN 'YouTube'
                    ELSE 'Other'
                END as source,
                COUNT(DISTINCT ip_address) as visitors,
                COUNT(*) as visits
            FROM visitors 
            WHERE referrer IS NOT NULL
            GROUP BY source
            ORDER BY visits DESC
        `);
        
        res.json({
            byDate,
            byCountry,
            byPage,
            referrers,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error getting visitor analytics:', error);
        res.status(500).json({ error: 'Failed to get visitor analytics' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the server
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
