const express = require('express')

const attendanceController = require('../controllers/attendanceControllers')

const router = express.Router()

router.get('/check-attendance', attendanceController.getCheckAttendance)
router.post('/save-attendance', attendanceController.postSaveAttendance)
module.exports = router