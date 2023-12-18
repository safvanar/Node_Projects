const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Comment