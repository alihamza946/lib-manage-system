// models/readLater.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); // Sequelize instance

const ReadLater = sequelize.define('ReadLater', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ReadLater;
