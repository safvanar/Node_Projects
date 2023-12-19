const express = require("express");
const attendanceRoute = require("./routes/attendance")
const sequelize = require("./utils/database");
const bodyParser = require('body-parser');
const Student = require('./models/student');
const Attendance = require('./models/attendance');
const mainRoute = require("./routes/main");



const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use("/attendance",attendanceRoute);
app.use("/", mainRoute);



Student.hasMany(Attendance);
Attendance.belongsTo(Student);

sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})
