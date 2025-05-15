// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../Auth/authController');  // Correct path
console.log("authRoutes.js loaded");


router.post('/register', register);
// Login route
router.post('/login', login);

module.exports = router;
