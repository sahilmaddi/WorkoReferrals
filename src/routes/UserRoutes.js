const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const dotenv = require('dotenv');
const authMiddleware = require('../middlewares/authMiddleware');
dotenv.config();

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error(`Registration failed: User already exists with email ${email}`);
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ email, name, password: hashedPassword });
        await user.save();
        console.log(`User registered with email: ${email}`);
        res.status(201).send('User registered');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).send(error.message);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.error(`Login failed: User not found with email ${email}`);
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error(`Login failed: Invalid credentials for email ${email}`);
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`User logged in with email: ${email}`);
        res.status(200).send({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).send(error.message);
    }
});

// Additional routes with middleware placeholders
router.post('/worko/user', authMiddleware, (req, res) => {
    res.send('Placeholder POST /worko/user');
});
router.get('/worko/user', authMiddleware, (req, res) => {
    res.send('Placeholder GET /worko/user');
});
router.get('/worko/user/:userId', authMiddleware, (req, res) => {
    res.send(`Placeholder GET /worko/user/${req.params.userId}`);
});
router.put('/worko/user/:userId', authMiddleware, (req, res) => {
    res.send(`Placeholder PUT /worko/user/${req.params.userId}`);
});
router.patch('/worko/user/:userId', authMiddleware, (req, res) => {
    res.send(`Placeholder PATCH /worko/user/${req.params.userId}`);
});
router.delete('/worko/user/:userId', authMiddleware, (req, res) => {
    res.send(`Placeholder DELETE /worko/user/${req.params.userId}`);
});

module.exports = router;
