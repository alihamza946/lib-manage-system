const { Book, Download } = require('../Models');

// Add a new book
const addBook = async (req, res) => {
  const { title, description } = req.body;
  const authorId = req.user.id; // Assume user info is attached via auth middleware

  try {
    const book = await Book.create({ title, description, author_id: authorId });
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding book", error: err.message });
  }
};

// Get book statistics (e.g., most downloaded books)
const getBookStats = async (req, res) => {
  const authorId = req.user.id;

  try {
    // Example: Get the most downloaded book for the author
    const stats = await Download.findAll({
      attributes: ['book_id', [sequelize.fn('COUNT', sequelize.col('book_id')), 'download_count']],
      where: { user_id: authorId },
      group: ['book_id'],
      order: [[sequelize.fn('COUNT', sequelize.col('book_id')), 'DESC']],
    });

    res.status(200).json({ message: "Book statistics", stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching book statistics", error: err.message });
  }
};

module.exports = { addBook, getBookStats };
