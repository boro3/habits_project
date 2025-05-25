const express = require('express');
const routes = require('./routes');
const cors = require("cors");

const PORT = 8000;

// Create Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(cors())

// Apply routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: `Route ${req.originalUrl} not found` 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;