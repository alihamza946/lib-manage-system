const { Book, ReadLater, Download, User } = require('../Models');
const bcrypt = require('bcryptjs'); // Add bcryptjs for password hashing
const { validationResult } = require('express-validator'); // For input validation

// View all books
const viewBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books", error: err.message });
  }
};

// Add book to "Read Later" list
const addToReadLater = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id; // Assuming user info is attached to the request

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if the book already exists in the "Read Later" list
    const existingEntry = await ReadLater.findOne({ where: { user_id: userId, book_id: bookId } });
    if (existingEntry) {
      return res.status(400).json({ message: "Book already in 'Read Later' list" });
    }

    // Add book to "Read Later" list
    const result = await ReadLater.create({ user_id: userId, book_id: bookId });
    res.status(201).json({ message: "Book added to 'Read Later' list", bookId: result.book_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to 'Read Later' list", error: err.message });
  }
};

// Download book
const downloadBook = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.id;

  try {
    // Track download action
    const result = await Download.create({ user_id: userId, book_id: bookId });
    res.status(200).json({ message: "Book downloaded successfully", bookId: bookId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error downloading book", error: err.message });
  }
};

// Update user profile (e.g., change password)
const updateProfile = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; // Update password
    await user.save(); // Save the updated user

    res.status(200).json({ message: "Profile updated successfully", user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

module.exports = {
  viewBooks,
  addToReadLater,
  downloadBook,
  updateProfile,
};
