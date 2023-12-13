const Sequelize = require('sequelize')

const sequelize = new Sequelize('booking_appointment', 'root', 'Safvanar@1', {
    dialect: 'mysql',
    host: 'localhost',
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