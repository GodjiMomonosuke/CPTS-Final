const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

var ADRI1 = "https://drive.google.com/file/d/1pBIrINpZGRsPmonHCMpD6Vrobal8vX5q/preview"
var ADRI1_1 = "ให้เขียนโปรแกรมรับค่าของตัวแปรและแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI1_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 16.1 (1 คะแนน)"
var ADRI1_3 = "ถ้าต้องการรับค่าข้อมูลเป็นข้อความเป็นชื่อเล่นของตนเอง ต้องแก้ไขอย่างไร และได้ผลลัพธ์อย่างไร (1 คะแนน)"
var ADRI2 = "https://drive.google.com/file/d/1o0XCMzQm7WUNV639rhytCrxdZaYoLbuw/preview"
var ADRI2_1 = "ให้เขียนโปรแกรมคำนวณหาปริมาตรทรงกรวย โดยกำหนดให้รับค่าตัวแปร radius และ height (3 คะแนน)"
var ADRI2_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 17.1 (1 คะแนน)"
var ADRI2_3 = "ถ้าต้องการหาพื้นที่สามเหลี่ยม โดยกำหนดให้รับค่าตัวแปร Base (ใส่เป็น 8.3) และ Height (ใส่เป็น 10.9) และได้ผลลัพธ์เท่าไร (1 คะแนน)"
var ADRI3 = "https://drive.google.com/file/d/1CX7kBXlcwnKMsxnXpHWhnEWqrS51hWxc/preview"
var ADRI3_1 = "ให้เขียนโปรแกรมแปลงอุณหภูมิ Celsius (C) เป็น Fahrenheit (F) โดยให้รับค่าตัวแปร C (3 คะแนน)"
var ADRI3_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 18.1 (1 คะแนน)"
var ADRI3_3 = "ถ้าต้องการให้แปลงอุณหภูมิ Fahrenheit (F) เป็น Celsius (C) จะต้องเขียนโปรแกรมโดยให้รับค่าตัวแปร F (ใส่ค่าเป็น 93) และได้ผลลัพธ์เท่าไร (1 คะแนน)"
var ADRI4 = "https://drive.google.com/file/d/1O_bv7V3TGVRSRU5wWClBmtI4fcOfZ5ia/preview"
var ADRI4_1 = "ให้เขียนโปรแกรมคำนวณยอดขายสินค้ารวมภาษี โดยให้รับค่าตัวแปร และให้ใส่ค่าของตัวแปรดังนี้ ภาษี VAT = 7% ราคาสินค้า A = 400, B = 600, C = 800 (3 คะแนน)"
var ADRI4_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 19.1 (1 คะแนน)"
var ADRI4_3 = "ถ้าต้องการรับค่าตัวแปรและใส่ค่าของตัวแปร ดังนี้ สินค้า D = 1000 และ E = 2000 จะต้องแก้ไขส่วนใดบ้าง และได้ผลลัพธ์เท่าไร (1 คะแนน)"
var ADRI5 = "https://drive.google.com/file/d/11TahBnBjiHp-YtvHoeBw2eblzJECsOra/preview"
var ADRI5_1 = "ให้เขียนโปรแกรมแสดงประวัติของผู้เรียน โดยให้รับค่าตัวแปร nickname, age, address (3 คะแนน)"
var ADRI5_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 20.1 (1 คะแนน)"
var ADRI5_3 = "ถ้าต้องการแสดงข้อมูลงานอดิเรก Hobby เพิ่มโดยใช้คำสั่ง fgets() ต้องเขียนโปรแกรมรับค่าตัวแปรอย่างไร และให้แสดงผลลัพธ์ที่ได้ (1 คะแนน)"

router.get('/', async (req, res, next) => {
  const person = req.user;
  // PRETEST Check
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mydatabase);
    var query = { email: person.email };
    dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
      if (err) throw err;
      if(Object.keys(StudentAnswer).length < 6){
        res.redirect('/pretest3_check')
      }
      else{
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var query = {email:person.email};
          dbo.collection("StudentRecommendation").find(query).toArray(function(err, RecommendaResult) {
            if (err) throw err;

            res.render('student/quiz/3_Input_and_Output-quiz', { person ,StudentAnswer,RecommendaResult,ADRI1,ADRI2,ADRI3,ADRI4,ADRI5});
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

  var currentQuiz = "Input_and_Output-(Post-test)" //*** */
  var timetodo = 0;

  /** check score */
  if(choice1 === 'A'){
    score1 = 1;
  }
  if(choice2 === 'D'){
    score2 = 1;
  }
  if(choice3 === 'C'){
    score3 = 1;
  }
  if(choice4 === 'A'){
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
  if(choice8 === 'B'){
    score8 = 1;
  }
  if(choice9 === 'A'){
    score9 = 1;
  }
  if(choice10 === 'B'){
    score10 = 1;
  }
  if(choice11 === 'A'){
    score11 = 1;
  }
  if(choice12 === 'D'){
    score12 = 1;
  }
  if(choice13 === 'B'){
    score13 = 1;
  }
  if(choice14 === 'C'){
    score14 = 1;
  }
  if(choice15 === 'B'){
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