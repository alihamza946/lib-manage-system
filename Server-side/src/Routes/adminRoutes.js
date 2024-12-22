const express = require('express');
const { viewUsers, deleteUser, addBook } = require('../Controllers/adminController');
const authMiddleware = require('../Middleware/role');

const router = express.Router();

// Admin routes with role-based access control
router.get('/users', authMiddleware(['admin']), viewUsers);
router.delete('/user/:userId', authMiddleware(['admin']), deleteUser);
router.post('/book', authMiddleware(['admin']), addBook);

module.exports = router;
