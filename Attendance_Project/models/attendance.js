const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Student = sequelize.define('attendance', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})

module.exports = Student