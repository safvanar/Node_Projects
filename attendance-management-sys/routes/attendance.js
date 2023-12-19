const express = require("express");
const attendanceControllers = require("../controllers/attendance")

const router = express.Router();

router.get("/get-students",attendanceControllers.getAllStudents);
router.get("/get-attendance/:date",attendanceControllers.getAttendance);
router.post("/post-attendance",attendanceControllers.postAttendance);
router.put("/update-presence", attendanceControllers.updatePresentDays);


module.exports = router;