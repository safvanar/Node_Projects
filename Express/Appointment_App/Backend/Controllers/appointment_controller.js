const bodyParser = require('body-parser')

const Appointment = require('../Models/appointment_model');

exports.postAddAppointment = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;
  const message = req.body.message;

  // Create a new appointment in the database using Sequelize
  Appointment.create({
    name: name,
    email: email,
    phone: phone,
    date: appointmentDate,
    time: appointmentTime,
    message: message,
  })
    .then(result => {
      res.status(201).redirect('/get-appointments');
    })
    .catch(err => {``
      console.error('Error adding appointment:', err);
      res.status(500).json({ message: 'Error adding appointment' });
    });
};

exports.getAppointments = (req, res, next) => {
  Appointment.findAll()
    .then(appointments => {
      res.status(200).json({ appointments: appointments })
    })
    .catch(err => console.log(err))
}

exports.getEditAppointment = (req, res, next) => {
  const appId = req.params.appointmentId
  Appointment.findByPk(appId)
    .then(appointment => {
      res.status(200).json({appointment: appointment})
    })
    .catch(err => {
      console.log(err)
    })
}

exports.deleteAppointment = (req, res, next) => {
  const appId = req.params.appointmentId
  Appointment.findByPk(appId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      res.redirect('/get-appointments')
    })
    .catch(err => {
      console.log(err)
    })
}
