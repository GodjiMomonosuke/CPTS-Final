const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

var ADRI1 = "https://drive.google.com/file/d/1NCFVwnLT9L4WsbNvJUipqavLCad1zx8v/preview" 
var ADRI1_1 = "ให้เขียนโปรแกรมแสดงสูตรคูณ รับค่าของตัวแปร สร้างเงื่อนไขใช้คำสั่ง for และแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI1_2 = "แสดงผลลัพธ์ที่ได้ของข้อที่ 16.1 (1 คะแนน)"
var ADRI1_3 = "เพิ่มเติมโค้ดให้สามารถตรวจสอบค่าของตัวเลข number ที่ป้อนว่าเป็นจำนวนเต็มบวกหรือไม่ ถ้าไม่ใช่ให้แจ้งเตือนแสดงข้อความ 'Please enter a positive integer.' (1 คะแนน)"
var ADRI2 = "https://drive.google.com/file/d/1X6IaInO0TTEDlarsfj-gCaptJIluu3_X/preview"
var ADRI2_1 = "ให้เขียนโปรแกรมแสดงผลรวมของตัวเลขตามจำนวนที่กำหนด โดยให้รับค่าของตัวแปร สร้างเงื่อนไขใช้คำสั่ง while และแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI2_2 = "แสดงผลลัพธ์ที่ได้ให้ครบทุกกรณีของข้อที่ 17.1 (1 คะแนน)"
var ADRI2_3 = "ให้แก้ไขโค้ดนี้เปลี่ยนจากการใช้ while loop เป็น for loop แทน (1 คะแนน)"
var ADRI3 = "https://drive.google.com/file/d/1bIYtpUKh3pY2FphsoVlpUguKvZiT2pUo/preview"
var ADRI3_1 = "เขียนโปรแกรมท้ายตัวเลข 1-100 โดยให้รับค่าของตัวแปร สร้างเงื่อนไขใช้คำสั่ง do while และแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI3_2 = "แสดงผลลัพธ์ที่ได้ให้ครบทุกกรณีของข้อที่ 18.1 (1 คะแนน)"
var ADRI3_3 = "แก้ไขเป็นใช้ while loop แทน (1 คะแนน)"
var ADRI4 = "https://drive.google.com/file/d/1g8Y5MN3Oc5CZ8bw1klvBXM_Vlnfra-sn/preview"
var ADRI4_1 = "เขียนโปรแกรมสร้างรูปสามเหลี่ยม โดยรับค่าของตัวแปร สร้างเงื่อนไขใช้คำสั่ง Nested Loops (for ซ้อน for) และแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI4_2 = "แสดงผลลัพธ์ที่ได้ให้ครบทุกกรณีของข้อที่ 19.1 (1 คะแนน)"
var ADRI4_3 = "อ้างอิงโค้ดเดิมให้เขียนโปรแกรมใหม่โดยให้สร้างเป็นรูปสี่เหลี่ยม (1 คะแนน)"
var ADRI5 = "https://drive.google.com/file/d/1a8y56ondTbiB1PyJec7fVR0ylyGIhJTe/preview"
var ADRI5_1 = "เขียนโปรแกรมการคำนวณเกรดนักเรียน โดยให้รับค่าของตัวแปร สร้างเงื่อนไขวนลูป และแสดงค่าของข้อมูลดังนี้ คำอธิบายโปรแกรมนี้จะให้ผู้ใช้ป้อนคะแนนที่ได้ในการสอบหลายรายวิชา แล้วคำนวณแสดงเกรด ผลรวมของคะแนนทุกวิชา และค่าเฉลี่ยรวมของคะแนนที่ได้ของนักเรียน โดยใช้เกณฑ์คะแนนตามที่กำหนด โดยเกรดมี A ( >= 80), B (>= 70),  C (>= 60), D (>= 50) และ F (< 50)"
var ADRI5_2 = "แสดงผลลัพธ์ที่ได้ให้ครบทุกกรณีของข้อที่ 20.1 (1 คะแนน)"
var ADRI5_3 = "แก้ไขโค้ดโดยเพิ่มเติมให้มีการตรวจสอบค่าคะแนนของ score ต้องอยู่ในช่วง 0 - 100 เท่านั้น ถ้าไม่ใช่ให้มีการแจ้งเตือนเป็นข้อความ 'Please enter a score between 0 and 100. ' (1 คะแนน)"

router.get('/', async (req, res, next) => {
  const person = req.user;
  // PRETEST Check
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mydatabase);
    var query = { email: person.email };
    dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
      if (err) throw err;
      if(Object.keys(StudentAnswer).length < 13){
        res.redirect('/pretest6_check')
      }
      else{
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var query = {email:person.email};
          dbo.collection("StudentRecommendation").find(query).toArray(function(err, RecommendaResult) {
            if (err) throw err;

            res.render('student/quiz/6_Loop_Statements-quiz', { person ,StudentAnswer,RecommendaResult,ADRI1,ADRI2,ADRI3,ADRI4,ADRI5});
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

  var scoreQuiz = ""
  var rating = req.body.rating

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

  var currentQuiz = "Loop_Statements-(Post-test)" //*** */
  var timetodo = 0;

/** check score */
if(choice1 === 'A'){
  score1 = 1;
}
if(choice2 === 'A'){
  score2 = 1;
}
if(choice3 === 'B'){
  score3 = 1;
}
if(choice4 === 'B'){
  score4 = 1;
}
if(choice5 === 'C'){
  score5 = 1;
}
if(choice6 === 'C'){
  score6 = 1;
}
if(choice7 === 'C'){
  score7 = 1;
}
if(choice8 === 'C'){
  score8 = 1;
}
if(choice9 === 'A'){
  score9 = 1;
}
if(choice10 === 'C'){
  score10 = 1;
}
if(choice11 === 'B'){
  score11 = 1;
}
if(choice12 === 'D'){
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
                ADRI1:ADRI1,
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

      res.redirect('/course')    
  } catch (error) {
    next(error);
  }
});

module.exports = router;