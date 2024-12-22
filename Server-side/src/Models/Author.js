const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); // Adjust the path to your sequelize instance

const Author = sequelize.define('Author', {
  // Defining the 'Author' model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increments the id
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Ensure the name is not null
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true, // Bio is optional
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets creation date
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets update date
  },
});

// Associations (Relationships)

Author.hasMany(
  require('./Book'), // Assuming the Book model is in the 'Book' file
  {
    foreignKey: 'author_id', // This is the column in 'Book' that references 'Author'
    onDelete: 'CASCADE', // If the author is deleted, their books are also deleted
  }
);

module.exports = Author;
