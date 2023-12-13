const express = require('express');

const appointmentController = require('../Controllers/appointment_controller')

const router = express.Router();


// /admin/add-product => GET
// router.get('/appointments', appointmentController.getAppointments);

// /admin/add-product => POST
router.post('/add-appointment', appointmentController.postAddAppointment);
router.get('/get-appointments', appointmentController.getAppointments)
router.get('/edit-appointment/:appointmentId', appointmentController.getEditAppointment)
router.delete('/delete-appointment/:appointmentId', appointmentController.deleteAppointment)
module.exports = router;