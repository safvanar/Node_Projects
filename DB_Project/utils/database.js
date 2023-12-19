// /models/index.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_management', 'root', 'Safvanar@1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize