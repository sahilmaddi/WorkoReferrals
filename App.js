const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

mongoose.connect('mongodb://localhost:27017/worko-sample', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mock user for authentication
const users = [{ username: 'test', password: bcrypt.hashSync('test', 8) }];

app.post('/login', (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.use(userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;