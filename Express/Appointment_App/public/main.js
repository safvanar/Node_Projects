
// Handle form submission using JavaScript
  const form = document.getElementById('appointmentForm')

  const name = document.getElementById('fullName')
  const email = document.getElementById('email')
  const phone = document.getElementById('phoneNumber')
  const appointmentDate = document.getElementById('appointmentDate')
  const appointmentTime = document.getElementById('appointmentTime')
  const message = document.getElementById('message')

 // main.js

document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch and display appointments
  function fetchAppointments() {
    // Make an Axios request to fetch appointments
    axios.get('/user/get-appointments')
      .then(response => {
        const data = response.data
        const appointments = data.appointments;

        // Check if the data contains the appointments property
        if (appointments) {
          // Assuming you have an element with id 'appointmentsList' to display the appointments
          const appointmentsList = document.getElementById('appointmentsList');

          // Clear the existing content
          appointmentsList.innerHTML = '';

          // Iterate over the appointments and append them to the table
          appointments.forEach(appointment => {
            const row = document.createElement('tr');

            // Populate table cells with appointment data
            row.innerHTML = `
              <td>${appointment.name}</td>
              <td>${appointment.email}</td>
              <td>${appointment.phone}</td>
              <td>${appointment.date}</td>
              <td>${appointment.time}</td>
              <td>${appointment.message}</td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="editAppointment(${appointment.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAppointment(${appointment.id})">Delete</button>
              </td>
            `;

            // Append the row to the table
            appointmentsList.appendChild(row);
          });
        } else {
          console.error('Error fetching appointments:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }

  // Call the fetchAppointments function when the page loads
  fetchAppointments();

  // Add an event listener to the form for submitting new appointments
    form.addEventListener('submit', e => {
      e.preventDefault()
      console.log(name.value, email.value, phone.value)
      const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        appointmentDate: appointmentDate.value,
        appointmentTime: appointmentTime.value,
        message: message.value
      }
      axios.post('/user/add-appointment', data)
        .then(res => {
          console.log(res)
          fetchAppointments();
       })
       .catch(err => {
        console.log(err)
       })
      // document.getElementById('appointmentForm').style.display = 'none';
      // document.getElementById('confirmationMessage').style.display = 'block';
    })


  // Function to handle editing an appointment
  window.editAppointment = function (appointmentId) {
    // Implement the logic to edit an appointment
    axios.get(`/user/edit-appointment/${appointmentId}`)
      .then(response => {
        deleteAppointment(appointmentId)
        const data = response.data
        const appointment = data.appointment
        document.getElementById('fullName').value = appointment.name
        document.getElementById('email').value =  appointment.email
        document.getElementById('phoneNumber').value = appointment.phone
        document.getElementById('appointmentDate').value = appointment.date
        document.getElementById('appointmentTime').value = appointment.time
        document.getElementById('message').value = appointment.message
      })
      .catch(err => {
        console.log(err)
      })
    console.log('Edit appointment with ID:', appointmentId);
  };

  // Function to handle deleting an appointment
  window.deleteAppointment = function (appointmentId) {
    // Implement the logic to delete an appointment
    axios.delete(`/user/delete-appointment/${appointmentId}`)
      .then(result => {
        fetchAppointments();
      })
      .catch(err => {
        console.log(err)
      })
    console.log('Delete appointment with ID:', appointmentId);
  };
});
 









  