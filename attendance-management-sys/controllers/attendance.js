const Attendance = require('../models/attendance');
const Students = require('../models/student')

exports.getAllStudents = async (req,res)=>{
    try{
       
       const students = await Students.findAll();
       res.status(200).json({students , message : "successfull fetch"});

    }catch(e){
       
       res.status(500).json({error:e});
    } 
}

exports.getAttendance = async (req,res) => {
    try{
        const targetDate = req.params.date;
        console.log(targetDate)
        const attendanceRecords = await Attendance.findAll({
            attributes: ['id','Presents'], 
            where: {
              date: targetDate,
            },
          });
          if (attendanceRecords.length === 0) {
            return res.json({'status' : false});
          }
          const formattedRecords = attendanceRecords.map((record) => ({
            id: record.id,
            Presents:record.Presents
          }));
          return res.json({newData:formattedRecords , 'status' : true});
    }catch(error){
        console.error('Error checking attendance status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.postAttendance = async (req,res) => {
  try{
    const dateInput = req.body.date;
    const attendanceData = req.body.Presents;

    let attendanceRecord = await Attendance.create({
        date: dateInput,
        Presents: attendanceData,
      
    });
    res.status(201).json({newData:attendanceRecord});
    console.log('Attendance submitted successfully!');
  
  }catch(err){
    console.log('error uuu');
  }
}

exports.updatePresentDays = async (req,res) => {
  try{
    const {studentId , status} = req.query;
    const student = await Students.findByPk(studentId);
    student.totalDays += 1;
    if(status=="present"){
      student.numberOfDayPresent += 1;
    }
    const response = await student.save();
    res.status(200).json({response});
    
  }catch(err){
    console.log(err);
  }

}