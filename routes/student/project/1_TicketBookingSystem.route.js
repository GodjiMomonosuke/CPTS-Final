const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

var ADRI = "https://drive.google.com/file/d/1PpWrOPCdhHaGmN-OWPOpa4aYoqvlZeAq/preview"
var ADRI1 = "Flowchart ใช้ draw.io (30 คะแนน)"
var ADRI2 = "Source Code ที่เขียนขึ้น (50 คะแนน)"
var ADRI3 = "แสดงผลลัพธ์ของโปรแกรม (10 คะแนน)"
var ADRI4 = "คำถาม: ถ้าต้องการแสดงข้อมูล ที่อยู่ ของผู้จอง ตั้งแต่บ้านเลขที่ หมู่ที่ ตำบล อำเภอ จังหวัด และรหัสไปรษณีย์ ต้องใช้คำสั่งใดในการรับค่าของข้อมูลนี้ (10 คะแนน)"
var ADRI_Answer = ""

router.post('/submit', async (req, res, next) => {
  const person = req.user;

  var code = req.body.code;
  var lang = req.body.lang;
  var sendLink16 = req.body.sendLink16
  var expResult16 = req.body.expResult16
  var expResult17 = req.body.expResult17
  var scoreTeacher = ""

  var currentProject = "TicketBookingSystem-(Project_quiz1)";
  var timetodo = 0;

  //*** COMPILER */
  var envData = { OS : "linux" , cmd : "gcc" };
  compiler.compileCPP(envData , code , function (data) {
    //compiler.compileCPP(envData, code, function (data) {
    var dataOut = data.output;
    if(dataOut === undefined || dataOut === null) {console.log("DataOut@undefined!!!! : "+dataOut)}
    else ;
    //** DATABASE */
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mydatabase);
      var query = { email:person.email};
      dbo.collection("StudentAnswer").find(query).toArray(function(err, result) {
        if (err) throw err;
        if(Object.keys(result).length >= 1){
          for (let i = 0; i < Object.keys(result).length; i++) {
            if(result[i].contentName === currentProject) timetodo++;
          }
        }
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var myobj = { 
            timetodo:timetodo+1,
            times: new Date().toLocaleString(), 
            email: person.email,
            name: person.name,
            role:person.role,
            contentName:currentProject,
            lang:lang,
            sendLink16:sendLink16,
            code:code,
            output:dataOut,
            expResult16:expResult16,
            expResult17:expResult17,
            ADRI:ADRI,
            ADRI1:ADRI1,ADRI2:ADRI2,ADRI3:ADRI3,ADRI4:ADRI4,
            scoreTeacher:scoreTeacher

            /*ADRI:ADRI,
            ADRI_Answer:ADRI_Answer*/
          };
          dbo.collection("StudentAnswer").insertOne(myobj, function(err, res) {
            if (err) throw err;
            db.close();
          });
        });
      });
    });//** DATABASE */
  }); //*** COMPILER */

  try {
      res.redirect('/project')    
  } catch (error) {
    next(error);
  }
});


router.get('/', async (req, res, next) => {
  const person = req.user;
  if(person != undefined){
    // PRETEST Check
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mydatabase);
      var query = { email: person.email };
      dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
        if (err) throw err;
        if(Object.keys(StudentAnswer).length === 0){
          res.redirect('/')
        }
        else{
          res.render('student/project/1_TicketBookingSystem', { person , ADRI });
        }
        db.close();
      });
    });
    // PRETEST Check
      
  }
});
module.exports = router;
