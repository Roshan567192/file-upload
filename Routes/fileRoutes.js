// src/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const { uploadFile, upload } = require('../Files/fileController'); // Adjust this path based on your structure

// File upload route
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
