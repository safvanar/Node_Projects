const Sequelize = require('sequelize')

const sequelize = new Sequelize('expenses', 'root', 'Safvanar@1', {
    dialect: 'mysql',
    host: 'localhost',
    // logging: false
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err)
    })

module.exports = sequelize