const express = require('express');
const { addBook, getBookStats } = require('../Controllers/authorController');
const authMiddleware = require('../Middleware/role');
const router = express.Router();

// Author routes with role-based access control
router.post('/book', authMiddleware(['author']), addBook);  // Add new book
router.get('/stats', authMiddleware(['author']), getBookStats);  // Get author-specific book stats

module.exports = router;
