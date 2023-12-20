const Sequelize = require('sequelize')
const sequelize = new Sequelize('attendance_project', 'root', 'Safvanar@1', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize