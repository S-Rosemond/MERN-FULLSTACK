const express = require('express');
const connectDB = require('./config/db');

// Initial express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Get request
app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/posts'));

// Listen on port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
