'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const db = {};
const Author = require('./Author');
const Book = require('./Book');
const Download = require('./Download');
const ReadLater = require('./ReadLater');
const User = require('./User');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Loop through all files and import models dynamically
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)); // Import model
    if (model.prototype instanceof Sequelize.Model) {
      // For class-based models
      db[model.name] = new model(sequelize, Sequelize.DataTypes);
    } else {
      // For function-based models
      db[model.name] = model(sequelize, Sequelize.DataTypes);
    }
  });

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, Author, Book, User, ReadLater, Download };
