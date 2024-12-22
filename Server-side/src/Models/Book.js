const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); // Adjust path to your sequelize instance
const Author = require('./Author'); // Import Author model for validation

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Author, // Referencing the Author model
      key: 'id',
    },
    validate: {
      // Ensure that author_id exists in the Author table
      async authorExists(value) {
        const author = await Author.findByPk(value);
        if (!author) {
          throw new Error('Author does not exist');
        }
      }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Book;
