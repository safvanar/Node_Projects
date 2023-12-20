const reportBtn = document.getElementById('reportBtn')
const dateForm = document.getElementById('dateForm')
const dateInputField = document.querySelector('input')
const contentRender = document.getElementById('contentRender')

dateForm.addEventListener('submit', fetchAttendance)
reportBtn.addEventListener('click', fetchReport)

async function fetchAttendance(e){
    e.preventDefault()
    const dateInput = dateInputField.value
    const response = await axios.get(`/attendance/getAttendance/${dateInput}`)
    
    if(response.data.status === 'unmarked'){
        // console.log('success')
        const students = response.data.students
        console.log(students)
        contentRender.innerHTML=''

        const contentTitle = document.createElement('h2')
        contentTitle.textContent = `Mark attendance for ${dateInput}`
        contentRender.appendChild(contentTitle)

        // Create a list with radio buttons for each student
        const list = document.createElement('ul');

        students.forEach((student) => {
            // Create list item
            const listItem = document.createElement('li');

            // Create label for the student name
            const nameLabel = document.createElement('label');
            nameLabel.textContent = student.name;
            nameLabel.style = "margin-right: 3rem"
            // Create radio button for present
            const presentRadio = document.createElement('input');
            presentRadio.type = 'radio';
            presentRadio.name = `attendance_${student.id}`;
            presentRadio.value = 'present';
            presentRadio.style = 'margin-right: 1rem'

            // Create radio button for absent
            const absentRadio = document.createElement('input');
            absentRadio.type = 'radio';
            absentRadio.name = `attendance_${student.id}`;
            absentRadio.value = 'absent';
            absentRadio.style = 'margin-right: 1rem'

            // Append elements to the list item
            listItem.appendChild(nameLabel);
            listItem.appendChild(presentRadio);
            listItem.appendChild(document.createTextNode('Present'));
            listItem.appendChild(absentRadio);
            listItem.appendChild(document.createTextNode('Absent'));

            // Append list item to the list
            list.appendChild(listItem);
        });

        // Append the list to the container
        contentRender.appendChild(list);

        // Create and style the submit button
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit Attendance';
        submitBtn.classList.add('btn', 'btn-warning', 'btn-md'); // Add Bootstrap button classes
        
        submitBtn.addEventListener('click', () => {
            // Collect selected values and send them to the server
            const attendanceData = [];
            students.forEach((student) => {
                const radioButtons = document.getElementsByName(`attendance_${student.id}`);
                const selectedValue = Array.from(radioButtons).find((radio) => radio.checked);
                if (selectedValue) {
                    attendanceData.push({
                        studentId: student.id,
                        attendance: selectedValue.value,
                        date: dateInput
                    });
                }
            });
            contentRender.innerHTML='Attends Marked successfully!'

            // Send the attendance data to the server using your preferred method (e.g., Axios)
            sendAttendanceData(attendanceData);
        });

        contentRender.appendChild(submitBtn);

    }else{
        const attendanceData = response.data.attendanceData
        console.log(attendanceData)
        contentRender.innerHTML='' 
        let htmlString = `<h2>Students Present</h2>
                                <ul>`

        attendanceData.forEach(elem => {
            if(elem.status === 'present'){
                htmlString+= `<li>Student ${elem.studentId}</li>`
            }
        })
        htmlString+= `</ul>`

        htmlString+=`<h2>Students Absent</h2>
                            <ul>`

        attendanceData.forEach(elem => {
            if(elem.status === 'absent'){
                htmlString+= `<li>Student ${elem.studentId}</li>`
            }
        })         
        
        htmlString+= `</ul>`

        contentRender.innerHTML=htmlString
    }
            
}

async function sendAttendanceData(attendanceData){
    const response = await axios.post('/attendance/markAttendance', {attendanceData})
}

async function fetchReport(e){
    e.preventDefault()
    const response = await axios.get('/attendance/getReport')
    const students = response.data.students
    let htmlText = `<h2>Student Attendance Report</h2>
                        <table>
                        <tr>
                            <th>Student</th>
                            <th>Present Day</th>
                            <th>Total Days</th>
                            <th>Percentage</th>
                        </tr>`
    students.forEach(student => {
        htmlText += `<tr>
                        <td>${student.name}</td>
                        <td>${student.daysPresent}</td>
                        <td>${student.totalDays}</td>
                        <td>${((student.daysPresent/student.totalDays)*100).toFixed(2)}%</td>
                    </tr>`
    })
    htmlText += `</table>`

    contentRender.innerHTML = htmlText
}