import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/register', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { username, email, password_hash } = req.body;

        const [existingUsers] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }


        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        );

        const [newUser] = await pool.execute(
            'SELECT id, username, email FROM users WHERE id = ?',
            [result.insertId]
        );

        const token = 'dummy-token-' + Math.random();

        res.status(201).json({
            token,
            user: newUser[0]
        });

    } catch (error) {
        console.error('Registration error:', error);
        console.log('Request body at error:', req.body);
        res.status(500).json({
            message: 'Error creating account'
        });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password_hash } = req.body;

        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND password_hash = ?',
            [email, password_hash]
        );

        if (rows.length > 0) {
            const user = rows[0];
            const token = 'dummy-token-' + Math.random();

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/feedbacks', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM feedbacks');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks' });
    }
});

app.post('/api/feedbacks', async (req, res) => {
    try {
        const { user_id, message } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO feedbacks (user_id, message) VALUES (?, ?)',
            [user_id, message]
        );
        res.json({ id: result.insertId, user_id, message });
    } catch (error) {
        res.status(500).json({ message: 'Error creating feedback' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});