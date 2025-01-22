import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/register', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const {username, email, password_hash} = req.body;

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
        const {email, password_hash} = req.body;

        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND password_hash = ?',
            [email, password_hash]
        );

        if (rows.length > 0) {
            const user = rows[0];
            const token = 'dummy-token-' + user.id;

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/api/feedbacks', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM feedbacks');
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Error fetching feedbacks'});
    }
});

app.get('/api/cryptos', async (req, res) => {

    try {
        const [rows] = await pool.execute('SELECT * FROM cryptos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Error fetching cryptos', error});
    }
});

app.post('/api/cryptos/update-price', async (req, res) => {
    try {
        const {id, price} = req.body;
        await pool.execute(
            'UPDATE cryptos SET current_price = ? WHERE id = ?',
            [price, id]
        );
        res.json({message: 'Price updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error updating price', error});
    }
});

app.get('/api/cryptos/price', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id, current_price FROM cryptos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Error fetching cryptos', error});
    }
});

app.get('/api/users/money', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[0];
        const userId = token?.split('-')[2];

        const [rows] = await pool.execute('SELECT id, money FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) return res.status(404).json({message: 'User not found'});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Error fetching user money', error});
    }
});

app.post('/api/users/money/add', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[0];
        const userId = token?.split('-')[2];
        const {amount} = req.body;

        await pool.execute(
            'UPDATE users SET money = money + ? WHERE id = ?',
            [amount, userId]
        );

        const [rows] = await pool.execute('SELECT money FROM users WHERE id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: 'Error adding money', error});
    }
});

app.post('/api/transactions/buy-crypto', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const token = req.headers.authorization?.split(' ')[0];
        const userId = token?.split('-')[2];
        const {cryptoId, amount, totalCost} = req.body;

        await connection.execute(
            'UPDATE users SET money = money - ? WHERE id = ? AND money >= ?',
            [totalCost, userId, totalCost]
        );

        await connection.execute(
            'INSERT INTO crypto_transactions (user_id, crypto_id, amount, price_at_purchase) VALUES (?, ?, ?, ?)',
            [userId, cryptoId, amount, totalCost / amount]
        );

        await connection.commit();
        res.json({success: true});
    } catch (error) {
        await connection.rollback();
        res.status(500).json({message: 'Transaction failed', error});
    } finally {
        connection.release();
    }
});

app.post('/api/transactions/sell', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = token?.split('-')[2];
        const { transactionId, amount, currentPrice } = req.body;

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            const [transaction] = await connection.execute(
                'SELECT * FROM crypto_transactions WHERE id = ? AND user_id = ?',
                [transactionId, userId]
            );

            if (!transaction.length) {
                throw new Error('Transaction not found');
            }

            const originalTransaction = transaction[0];
            const profit = (currentPrice - originalTransaction.price_at_purchase) * amount;

            await connection.execute(
                'UPDATE crypto_transactions SET amount = amount - ? WHERE id = ?',
                [amount, transactionId]
            );

            await connection.execute(
                'UPDATE users SET money = money + ? WHERE id = ?',
                [currentPrice * amount, userId]
            );

            await connection.commit();
            res.json({ message: 'Crypto sold successfully', profit });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ message: 'Error selling crypto', error });
    }
});

app.get('/api/transactions/crypto', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[0];
        const userId = token?.split('-')[2];

        const [rows] = await pool.execute(`
            SELECT ct.*, c.crypto_name
            FROM crypto_transactions ct
            JOIN cryptos c ON ct.crypto_id = c.id
            WHERE ct.user_id = ? AND ct.amount != 0
            ORDER BY ct.created_at DESC
        `, [userId]);

        // const [rows] = await pool.execute(`
        //     SELECT ct.*, c.crypto_name
        //     FROM crypto_transactions ct
        //     JOIN cryptos c ON ct.crypto_id = c.id
        //     WHERE ct.user_id = ?
        //     GROUP BY ct.crypto_id, c.crypto_name
        //     ORDER BY ct.created_at DESC
        // `, [userId]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch transactions', error});
    }
});

app.post('/api/feedbacks', async (req, res) => {
    try {
        const {user_id, message} = req.body;
        const [result] = await pool.execute(
            'INSERT INTO feedbacks (user_id, message) VALUES (?, ?)',
            [user_id, message]
        );
        res.json({id: result.insertId, user_id, message});
    } catch (error) {
        res.status(500).json({message: 'Error creating feedback'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});