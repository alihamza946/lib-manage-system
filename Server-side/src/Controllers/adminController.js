const { Book, User, Author } = require('../Models');

// View all users
const viewUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

// Manage books (Add, Update, Delete)
const addBook = async (req, res) => {
  const { title, description, authorId } = req.body;

  try {
    const book = await Book.create({ title, description, author_id: authorId });
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding book", error: err.message });
  }
};

module.exports = { viewUsers, deleteUser, addBook };
