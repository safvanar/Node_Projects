const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const DateModel = sequelize.define('date', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = DateModel;
