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
            res.status(200).json({status: 'unmarked', students: students})
        }else{
            const attendances = await Attendance.findAll({where: {date: dateInput}})
            res.status(200).json({status: 'marked', attendanceData: attendances})
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
            if(elem.attendance==='present'){
                student.daysPresent+=1
                student.totalDays+=1
                await student.save()
            }else{
                student.totalDays+=1
                await student.save()
            }
            await student.createAttendance({
                status: elem.attendance,
                date: elem.date,
            })
        }))
        res.status(201).redirect(`attendance/getAttendance/:${attendanceData[0].date}`)
    }catch(err){
        console.log('error marking the attendance: ', err)
        res.status(500).json({error: 'internal server error'})
    }
}

exports.getReport = async (req, res, next) => {
    try{
        const students = await Student.findAll()
        res.status(200).json({message: 'successfully generated the report', students: students})
    }catch(err){
        console.log('error while generating report: ', err)
        res.status(500).json({message: 'error generating report'})
    }
}