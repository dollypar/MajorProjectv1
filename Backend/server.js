const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary

const app = express(); // Initialize app first

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);

// Default route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
