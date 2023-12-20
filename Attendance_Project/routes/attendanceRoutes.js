const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController')

router.get('/', attendanceController.getAttendanceIndex)
router.get('/getAttendance/:date', attendanceController.getAttendance)
router.post('/markAttendance', attendanceController.postAttendance)
router.get('/getReport', attendanceController.getReport)
module.exports = router