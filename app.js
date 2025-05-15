// src/server.js
const express = require('express');
const { sequelize } = require('./models');
const fileRoutes = require('./Routes/fileRoutes');
console.log(fileRoutes);
const authRoutes = require('./Routes/authRoutes');
console.log(authRoutes);
const { authenticateJWT } = require('./Auth/authMiddleware');
console.log(authenticateJWT); 
require('dotenv').config();

const app = express();
app.use(express.json());

// Health check route
app.get('/health', (req, res) => res.send('OK'));

// Authentication routes
app.use('/auth', authRoutes);


// Protected routes for file upload and status check
app.use('/upload', authenticateJWT, fileRoutes);

// Start the server
sequelize.sync().then(() => {
  app.listen(8001, () => {
    console.log('Server running on port 8001');
  });
});
