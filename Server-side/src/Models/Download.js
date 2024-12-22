// models/download.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); // Sequelize instance

const Download = sequelize.define('Download', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Download;
