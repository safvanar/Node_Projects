const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_projects', 'root', 'Safvanar@1', { 
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize