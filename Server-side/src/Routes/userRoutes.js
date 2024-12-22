const express = require('express');
const { viewBooks, addToReadLater, downloadBook, updateProfile } = require('../Controllers/userController');
const authMiddleware = require('../Middleware/role');
const router = express.Router();

// User routes with role-based access control
router.get('/books', authMiddleware(), viewBooks);  // View all books (open to authenticated users)
router.post('/read-later', authMiddleware(), addToReadLater);  // Add book to "Read Later" list
router.post('/download/:bookId', authMiddleware(), downloadBook);  // Download book
router.put('/profile', authMiddleware(), updateProfile);  // Update user profile

module.exports = router;
