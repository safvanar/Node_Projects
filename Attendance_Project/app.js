const express = require('express')
const sequelize = require('./utils/database')
const bodyParser = require('body-parser')
const Student = require('./models/student')
const Attendance = require('./models/attendance')
const attendanceRoute = require('./routes/attendanceRoutes')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.use('/attendance', attendanceRoute)

app.use('/', (req, res, next) => {
    res.sendFile('index.html', {root:'views'})
})

Student.hasMany(Attendance)

async function initiate(){
    try{
        await sequelize.sync()
        //Create 10 students
        // for (let i = 1; i <= 10; i++) {
        //     await Student.create({
        //         name: `Student ${i}`,
        //         daysPresent: 0
        //     });
        // }
        app.listen(5000, () => {
            console.log('server running succesfully on port 5000...')
        })
    }catch(err){
        console.log('server failed to start: ', err)
    }
}

initiate()