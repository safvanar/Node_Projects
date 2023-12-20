const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Student = sequelize.define('student', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    daysPresent: {
        type: Sequelize.INTEGER,
    },
    totalDays: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Student