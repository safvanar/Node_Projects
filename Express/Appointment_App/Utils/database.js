const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false
})

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize