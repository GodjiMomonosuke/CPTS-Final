const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

var ADRI1 = "https://drive.google.com/file/d/106i_3KSzGnwtZUVPp_lhIX5tQwsAU-kI/preview"
var ADRI1_1 = "ให้เขียนโปรแกรมกำหนดและแสดงข้อข้อมูลด้วยการใช้ Array 1 มิติ ดังนี้ (3 คะแนน)"
var ADRI1_2 = "แสดงผลลัพธ์ที่ได้ของข้อที่ 16.1 (1 คะแนน)"
var ADRI1_3 = "ถ้าต้องการเก็บข้อมูลและแสดงข้อมูลจำนวน 20 ค่า พร้อมทั้งแสดงข้อมูลตำแหน่ง Index ที่ 18 ต้องแก้ไขโปรแกรมอย่างไร (1 คะแนน)"
var ADRI2 = "https://drive.google.com/file/d/1KQx37p5_hPIWOOtGFgU04Q7pwBgIdH8v/preview"
var ADRI2_1 = "ให้เขียนโปรแกรมกำหนดและแสดงข้อข้อมูลด้วยการใช้ Array 2 มิติ ดังนี้ (3 คะแนน)"
var ADRI2_2 = "แสดงผลลัพธ์ที่ได้ของข้อที่ 17.1 (1 คะแนน)"
var ADRI2_3 = "ถ้าต้องการเก็บข้อมูล Matrix ขนาด 3 x 3 พร้อมทั้งแสดงข้อมูลตำแหน่ง [2][2] ต้องแก้ไขโปรแกรมอย่างไร และได้ค่าข้อมูลใด โดยให้โปรแกรมสามารถรับค่าจากผู้ใช้ได้ (1 คะแนน"
var ADRI3 = "https://drive.google.com/file/d/169yfDhNWYSPaQ_d2UO_gb7VmnPgBSMRU/preview"
var ADRI3_1 = "ให้เขียนโปรแกรมกำหนดและแสดงข้อข้อมูลด้วยการใช้ Array 3 มิติ ขนาด 3 x 3 x 3 ดังนี้ (3 คะแนน)"
var ADRI3_2 = "แสดงผลลัพธ์ที่ได้ของข้อที่ 18.1 (1 คะแนน)"
var ADRI3_3 = "ถ้าต้องการเก็บข้อมูล Matrix ขนาด 3 x 3 x 3 พร้อมทั้งแสดงข้อมูลตำแหน่ง [2][2][2] โดยให้โปรแกรมสามารถรับค่าจากผู้ใช้ได้ (1 คะแนน)"
var ADRI4 = "https://drive.google.com/file/d/1Y7SgRDpi4nzbDUh2YKy3hvpWVS5atL7y/preview"
var ADRI4_1 = "ให้เขียนโปรแกรมตามที่กำหนด โดยใช้ฟังก์ชันต่าง ๆ ของ string.h ดังนี้ (3 คะแนน)"
var ADRI4_2 = "แสดงผลลัพธ์ที่ได้ของข้อที่ 19.1 (1 คะแนน)"
var ADRI4_3 = "จากโปรแกรมข้างต้นให้เขียนโปรแกรมใหม่ทำการเพิ่มตัวแปรชื่อ name เก็บชื่อ นามสกุล โดยให้รับค่าข้อมูลจาก Keyboard และให้ใช้ฟังก์ชันต่าง ๆ ของ String เพื่อให้แสดงข้อความดังนี้ 1) ชื่อ นามสกุล Computer Engineering 2) แสดงจำนวนความยาวของข้อความข้อ 1) 3) ทำการสลับค่าข้อความจาก ชื่อ นามสกุล Computer Engineering เป็น Computer Engineering ชื่อ นามสกุล (โดยใช้ฟังก์ชันของ String มาช่วยในการเก็บค่าและแสดง) (1 คะแนน)"
var ADRI5 = "https://drive.google.com/file/d/1AEd55yhom5bJ3rH10LmUsywpydUd_5Ho/preview"
var ADRI5_1 = "ให้เขียนโปรแกรมตามที่กำหนด โดยใช้ฟังก์ชันต่าง ๆ ของ string.h ดังนี้ (3 คะแนน)"
var ADRI5_2 = "แสดงผลลัพธ์ที่ได้ของข้อที่ 20.1 (1 คะแนน)"
var ADRI5_3 = "จากโปรแกรมข้างต้นให้เขียนโปรแกรมต่อจากเดิม โดยเมื่อ i มากกว่าเท่ากับ 0 เป็นเท็จ ให้ทำการ Reverse Text ของ inputSpring อีกครั้งเพื่อให้แสดงข้อความกลับเป็นข้อความเดิม หลังจากนั้นให้จบการทำงาน (1 คะแนน)"

router.get('/', async (req, res, next) => {
  const person = req.user;
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
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var query = {email:person.email};
          dbo.collection("StudentRecommendation").find(query).toArray(function(err, RecommendaResult) {
            if (err) throw err;

            res.render('student/pretest/7_Arrays_and_Strings-pretest', { person ,StudentAnswer,RecommendaResult,ADRI1,ADRI2,ADRI3,ADRI4,ADRI5});
          });
        });
      }
      db.close();
    });
  });
  // PRETEST Check
});


/** user quiz send  */
router.post('/submit', async (req, res, next) => {
  const person = req.user;
  const choice1  = req.body.choice1
  const choice2  = req.body.choice2
  const choice3  = req.body.choice3
  const choice4  = req.body.choice4
  const choice5  = req.body.choice5
  const choice6  = req.body.choice6
  const choice7  = req.body.choice7
  const choice8  = req.body.choice8
  const choice9  = req.body.choice9
  const choice10  = req.body.choice10
  const choice11  = req.body.choice11
  const choice12  = req.body.choice12
  const choice13  = req.body.choice13
  const choice14  = req.body.choice14
  const choice15  = req.body.choice15
  
  var code = req.body.code;
  var lang = req.body.lang;
  var expResult16 = req.body.expResult16
  var expResult17 = req.body.expResult17
  var expResult18 = req.body.expResult18
  var expResult19 = req.body.expResult19
  var expResult20 = req.body.expResult20
  var sendLink16 = req.body.sendLink16
  var sendLink171 = req.body.sendLink171
  var sendLink172 = req.body.sendLink172
  var sendLink181 = req.body.sendLink181
  var sendLink182 = req.body.sendLink182
  var sendLink191 = req.body.sendLink191
  var sendLink192 = req.body.sendLink192
  var sendLink201 = req.body.sendLink201
  var sendLink202 = req.body.sendLink202
  var rating = req.body.rating
  var scoreQuiz = ""

  var score1 = 0;
  var score2 = 0;
  var score3 = 0;
  var score4 = 0;
  var score5 = 0;
  var score6 = 0;
  var score7 = 0;
  var score8 = 0;
  var score9 = 0;
  var score10 = 0;
  var score11 = 0;
  var score12 = 0;
  var score13 = 0;
  var score14 = 0;
  var score15 = 0;

  var currentQuiz = "Arrays_and_Strings-(Pre-test)" //*** */
  var timetodo = 0;

/** check score */
if(choice1 === 'A'){
  score1 = 1;
}
if(choice2 === 'A'){
  score2 = 1;
}
if(choice3 === 'A'){
  score3 = 1;
}
if(choice4 === 'B'){
  score4 = 1;
}
if(choice5 === 'D'){
  score5 = 1;
}
if(choice6 === 'C'){
  score6 = 1;
}
if(choice7 === 'D'){
  score7 = 1;
}
if(choice8 === 'D'){
  score8 = 1;
}
if(choice9 === 'A'){
  score9 = 1;
}
if(choice10 === 'D'){
  score10 = 1;
}
if(choice11 === 'A'){
  score11 = 1;
}
if(choice12 === 'A'){
  score12 = 1;
}
if(choice13 === 'D'){
  score13 = 1;
}
if(choice14 === 'C'){
  score14 = 1;
}
if(choice15 === 'C'){
  score15 = 1;
}


  /** compiler */
  var envData = { OS : "linux" , cmd : "gcc" };
  compiler.compileCPP(envData , code , function (data) {
    //compiler.compileCPP(envData , code , function (data) {
        var dataOut = data.output;
        if(dataOut === undefined || dataOut === null) {console.log("DataOut@undefined!!!! : "+dataOut)}
        else ;

        /** check and insert info,score  */
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var query = { email:person.email};
          dbo.collection("StudentAnswer").find(query).toArray(function(err, result) {
            if (err) throw err;
            if(Object.keys(result).length >= 1){
              for (let i = 0; i < Object.keys(result).length; i++) {
                //console.log(result[i].contentName)
                if(result[i].contentName === currentQuiz) timetodo++;
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
                studentID: person.studentID,
                role:person.role,
                contentName:currentQuiz,
                c1:score1,
                c2:score2,
                c3:score3,
                c4:score4,
                c5:score5,
                scoreLV1:score1+score2+score3+score4+score5,
                c6:score6,
                c7:score7,
                c8:score8,
                c9:score9,
                c10:score10,
                scoreLV2:score6+score7+score8+score9+score10,
                c11:score11,
                c12:score12,
                c13:score13,
                c14:score14,
                c15:score15,
                scoreLV3:score11+score12+score13+score14+score15,
                lang:lang,
                code:code,
                output:dataOut,
                expResult16:expResult16,
                sendLink16:sendLink16,
                expResult17:expResult17,
                sendLink171:sendLink171,
                sendLink172:sendLink172,
                expResult18:expResult18,
                sendLink181:sendLink181,
                sendLink182:sendLink182,
                expResult19:expResult19,
                sendLink191:sendLink191,
                sendLink192:sendLink192,
                expResult20:expResult20,
                sendLink201:sendLink201,
                sendLink202:sendLink202,
                rating:rating,
                scoreQuiz:scoreQuiz,
                ADRI1_1:ADRI1_1,
                ADRI1_2:ADRI1_2,
                ADRI1_3:ADRI1_3,
                ADRI2:ADRI2,
                ADRI2_1:ADRI2_1,
                ADRI2_2:ADRI2_2,
                ADRI2_3:ADRI2_3,
                ADRI3:ADRI3,
                ADRI3_1:ADRI3_1,
                ADRI3_2:ADRI3_2,
                ADRI3_3:ADRI3_3,
                ADRI4:ADRI4,
                ADRI4_1:ADRI4_1,
                ADRI4_2:ADRI4_2,
                ADRI4_3:ADRI4_3,
                ADRI5:ADRI5,
                ADRI5_1:ADRI5_1,
                ADRI5_2:ADRI5_2,
                ADRI5_3:ADRI5_3
                /**ADRI:ADRI,
                ADRI_Answer:ADRI_Answer*/
              };
              dbo.collection("StudentAnswer").insertOne(myobj, function(err, res) {
                if (err) throw err;
                db.close();
              });
            });
          });
        });

    });/** compiler */

  try {

      res.redirect('/course-Arrays_and_Strings')    
  } catch (error) {
    next(error);
  }
});

module.exports = router;