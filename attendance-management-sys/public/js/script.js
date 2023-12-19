

  const searchBtn = document.getElementById('search-btn');
  const attendanceList = document.getElementById('attendanceList');
  const markAttendanceForm = document.getElementById('markAttendanceForm');
  const submitBtn = document.getElementById('submitBtn');
  const reportBtn = document.getElementById('reportBtn');
  const reportTable = document.getElementById('reportTable');

  const fetchStudents = async (e) => {
    
    try {
        const dateInput = document.getElementById('date').value;
      
        const result = await axios.get(`http://localhost:3000/attendance/get-attendance/${dateInput}`);
        console.log(result.data)
        if(!result.data.status){
          // console.log("hi")
          const response = await axios.get('http://localhost:3000/attendance/get-students'); 
        
          const students = response.data.students;
          attendanceList.innerHTML = '';
          reportTable.innerHTML = '';

  
          students.forEach(student => {
            const studentName = student.name;
            const listItem = document.createElement('li');
            listItem.innerHTML = `<label><strong>${studentName}</strong></label>
                                  <label><input type="radio" name="${studentName}" value="present" class="${student.id}"> Present</label>
                                  <label><input type="radio" name="${studentName}" value="absent" class="${student.id}"> Absent</label>`;
            attendanceList.appendChild(listItem);
          });
          submitBtn.style.display = 'block';
        }else{
          // console.log(result.data.newData[0].Presents);
          showAttendance(result.data.newData[0].Presents);
        }
      
       
    
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };


  const submitAttendance = async (e) => {
    e.preventDefault();
    const dateInput = document.getElementById('date').value;

    const radioInputs = document.querySelectorAll('input[type=radio]:checked');

    const attendanceData = [];

    radioInputs.forEach( async (radioInput) => {
      const studentName = radioInput.name;
      const status = radioInput.value.toLowerCase();
      const studentId = radioInput.className;
      

      attendanceData.push({
        studentName,
        status,
      });

      if(studentId){
        if(status=="present" ){
          console.log(`${studentId} present`);
          await axios.put(`attendance/update-presence?studentId=${studentId}&status=present`);
        }else{
          console.log(`${studentId} absent`);
          await axios.put(`attendance/update-presence?studentId=${studentId}&status=absent`);
        }
        
      }
    });
    
  
    let obj = {
      date: dateInput,
      Presents: JSON.stringify(attendanceData),
    };
    

    axios.post("http://localhost:3000/attendance/post-attendance" ,obj)
        .then(res =>{
            
            showAttendance(res.data.newData.Presents);
            
        })
        .catch(err => {
            console.log(err)
            document.body.innerHTML=document.body.innerHTML + "<h3>error occured</h3>"
        })
  };

  const showAttendance = (PresentsData) => {
      // console.log("dummy");

      try {
        
        const attendanceData = JSON.parse(PresentsData);
    
        attendanceList.innerHTML = '';
        reportTable.innerHTML = '';
    
        attendanceData.forEach((student) => {
          console.log(student);
          const listItem = document.createElement('li');
          listItem.innerHTML = `<strong>${student.studentName}</strong>: ${student.status}`;
          attendanceList.appendChild(listItem);
        });

        submitBtn.style.display = 'none';
    
      } catch (error) {
        console.error('Error displaying attendance:', error);
      }
    };
    
    const fetchReport = async (e)=>{
      e.preventDefault();
      try{
        const response = await axios.get('http://localhost:3000/attendance/get-students'); 
        const students = response.data.students;
  
        attendanceList.innerHTML = '';
        reportTable.innerHTML = '';
  
        const headerRow = reportTable.insertRow(0);
        const headerNameCell = headerRow.insertCell(0);
        const headerPresentsCell = headerRow.insertCell(1);
        const headerPercentageCell = headerRow.insertCell(2);
        headerNameCell.textContent = 'Student Name';
        headerPresentsCell.textContent = 'Presents/Total';
        headerPercentageCell.textContent = 'Percentage';
    
        students.forEach(student => {
          const row = reportTable.insertRow(-1);
          const nameCell = row.insertCell(0);
          const presentsCell = row.insertCell(1);
          const percentageCell = row.insertCell(2);
    
          const { name, numberOfDayPresent, totalDays } = student;
    
          const presentsTotal = `${numberOfDayPresent}/${totalDays}`;
          const percentage = ((numberOfDayPresent / totalDays) * 100).toFixed(2);
    
          nameCell.textContent = name;
          presentsCell.textContent = presentsTotal;
          percentageCell.textContent = `${percentage}%`;
        });
        
        document.body.appendChild(reportTable);
        submitBtn.style.display = 'none';
      }
      catch(err){
        console.log(err);
      }
    }
    
  reportBtn.addEventListener('click' , fetchReport);
  markAttendanceForm.addEventListener('submit' ,submitAttendance);
  searchBtn.addEventListener('click', fetchStudents);

