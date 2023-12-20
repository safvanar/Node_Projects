const Student = require('../models/student')
const Attendance = require('../models/attendance')

exports.getAttendanceIndex = (req, res, next) => {
    res.sendFile('index.html', {root: 'views'})
}

exports.getAttendance = async (req, res, next) => {
    try{
        const dateInput = req.params.date
        // console.log('date is: ',dateInput)
        // res.status(200).send({message: 'success'})
        const attendanceEntry = await Attendance.findOne({where: {date: dateInput}})
        if(!attendanceEntry){
            const students = await Student.findAll()
            res.status(200).send({status: 'unmarked', students: students})
        }else{
            res.status(200).send({status: 'marked'})
        }
    }catch(err){
        console.log('Error fetching the attendance details')
    }
}

exports.postAttendance = async (req, res, next) => {
    try{
        const attendanceData = req.body.attendanceData
        console.log(attendanceData)
        await Promise.all(attendanceData.map(async (elem) => {
            const student = await Student.findByPk(elem.studentId)
            await student.createAttendance({
                status: elem.attendance,
                date: elem.date,
            })
        }))
        res.status(200).json({message: 'Attendance marked successfully'})
    }catch(err){
        console.log('error marking the attendance: ', err)
        res.status(500).json({error: 'internal server error'})
    }
}