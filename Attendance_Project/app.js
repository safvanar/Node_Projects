const sequelize = require('./utils/database')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Student = require('./models/student')
const Attendance = require('./models/attendance')
const DateModel = require('./models/date')

const attendanceRouter = require('./routes/attendanceRoutes')

const app = express()

app.use(bodyParser.json({extended: false}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

app.use('/attendances', attendanceRouter)

app.use((req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})

// A Date can have many Attendances
DateModel.hasMany(Attendance);
Attendance.belongsTo(DateModel);

// A Student can have many Attendances
Student.hasMany(Attendance);
Attendance.belongsTo(Student);

async function initiate() {
    try {
        await sequelize.sync()

        // Check if there are any students in the database
        const studentCount = await Student.count();

        // If no students exist, create 10 students
        if (studentCount === 0) {
            for (let i = 1; i <= 10; i++) {
                await Student.create({
                    name: `Student ${i}`,
                    // Add other student-related fields as needed
                });
            }
            console.log('10 students created successfully.');
        }

        app.listen(3000, () => {
            console.log('Server running successfully on port 3000...');
        });
    } catch (err) {
        console.log(err);
    }
}


initiate()