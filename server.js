const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Initialize express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Get request : remove app.get for production

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// PRODUCTION: serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
// Listen on port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
