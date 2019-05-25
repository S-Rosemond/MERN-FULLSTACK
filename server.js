const express = require('express');
const connectDB = require('./config/db');

// Initial express
const app = express();

// Connect Database
connectDB();

// Get request
app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT || 5000;

// List on port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
