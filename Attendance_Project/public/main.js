const dateForm = document.getElementById('dateForm')
const dateSelected = document.getElementById('date')
const formContent = document.getElementById('formContent')
dateForm.addEventListener('submit', searchAttendance)

async function searchAttendance(e){
    e.preventDefault()
    const selectedDate = dateSelected.value
    console.log(selectedDate)
    const response = await axios.get(`/attendances/check-attendance?selectedDate=${selectedDate}`)
        
    const { status, attendance, form } = response.data;

    if (status === 'marked') {
        // Attendance already marked, display the status
        console.log('Attendance status:', attendance);
        // Update your UI accordingly
    } else if (status === 'not-marked') {
        // Update your UI to show the attendance form
        renderAttendanceForm(form, selectedDate);
        
    }
}

function renderAttendanceForm(formDetails, selectedDate) {
    // Clear existing content in the formContent div
    formContent.innerHTML = '';

    // Assume formDetails.students is an array of student names
    const students = formDetails.students;

    // Create HTML code for the attendance form
    const formHTML = `
        <form id="attendanceForm">
            <h2>Mark Attendance</h2>

            <div id="studentsList">
                ${students.map(student => `
                    <div class="studentRow">
                        <label>${student.name}  </label>
                        <input type="radio" name="${student.name}-attendance" value="present" /> Present
                        <input type="radio" name="${student.name}-attendance" value="absent" /> Absent
                    </div>
                `).join('')}
            </div>
            <button type="submit">Submit Attendance</button>
        </form>
    `;

    // Insert the HTML code into the formContent div
    formContent.innerHTML = formHTML;

    // Add event listener for form submission (adjust as needed)
    const attendanceForm = document.getElementById('attendanceForm');
    attendanceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Handle form submission, e.g., send attendance data to the server
        // Gather attendance data
        const attendanceData = {};
        students.forEach(student => {
            const selectedValue = document.querySelector(`input[name="${student.value}"]:checked`);
            attendanceData[student.value] = selectedValue ? selectedValue.value : null;
        });

        // Send attendance data to the server
        sendAttendanceData(attendanceData, selectedDate);
    });
}

// Function to send attendance data to the server
function sendAttendanceData(attendanceData, selectedDate) {
    // Make a request to the server endpoint to save attendance data
    axios.post('/attendances/save-attendance', {
        date: selectedDate,
        attendance: attendanceData,
    })
    .then(response => {
        console.log('Attendance data sent successfully:', response.data);
        // Update your UI or perform any necessary actions
    })
    .catch(error => {
        console.error('Error sending attendance data:', error);
        // Handle error, e.g., display an error message to the user
    });
}