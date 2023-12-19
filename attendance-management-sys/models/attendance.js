const Sequelize = require("sequelize");

const sequelize = require("../utils/database");


const Attendance = sequelize.define('Attendance', {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },

  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  
  Presents: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  // Status :{
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false,
  //   default: false
  // }
});
  

module.exports = Attendance;