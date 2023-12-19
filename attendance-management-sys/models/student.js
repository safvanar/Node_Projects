const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Student = sequelize.define('students', {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        numberOfDayPresent : {
          type: Sequelize.INTEGER,
          default:0,
        },
        totalDays : {
          type: Sequelize.INTEGER,
          default:0,
        }

  } , {
    timestamps:false,
  });

    
  
  module.exports = Student;