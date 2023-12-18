const Student = require('../models/student')
const Attendance = require('../models/attendance')
const DateModel = require('../models/date')

exports.getCheckAttendance = async (req, res) => {
    try {
        const { selectedDate } = req.query;
        // Check if attendance exists for the selected date
        const existingAttendance = await DateModel.findOne({
            where: { date: selectedDate },
            include: [{ model: Attendance, include: [{ all: true }] }],
        });

        if (existingAttendance) {
            // Attendance already marked, send status
            res.json({ status: 'marked', attendance: existingAttendance.Attendances });
        } else {
            const students = await Student.findAll()
            // Attendance not marked, send form
            res.json({ status: 'not-marked', form: { students: students } });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.postSaveAttendance = async (req, res) => {
    try {
        const { date, attendance } = req.body;

        // Check if attendance already exists for the selected date
        let dateModel = await DateModel.findOne({
            where: { date },
            include: [{ model: Attendance }],
        });

        if (!dateModel) {
            // If no attendance record for the date exists, create one
            dateModel = await DateModel.create({ date });
        }

        // Update or create attendance records for each student
        const students = Object.keys(attendance);
        for (const student of students) {
            const status = attendance[student];
            console.log(status)
            // Find or create the attendance record for the student on the given date
            const [attendanceRecord, created] = await Attendance.findOrCreate({
                where: {
                    id: dateModel.id,
                    studentId: student, // Assuming student ID is used here, adjust as needed
                },
                defaults: { status },
            });

            // If the record already existed, update the status
            if (!created) {
                attendanceRecord.status = status;
                await attendanceRecord.save();
            }
        }

        res.json({ message: 'Attendance saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

