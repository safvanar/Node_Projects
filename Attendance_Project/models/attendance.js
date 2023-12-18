const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Attendance = sequelize.define('attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.ENUM('present', 'absent'),
        allowNull: false
    }
})

module.exports = Attendance