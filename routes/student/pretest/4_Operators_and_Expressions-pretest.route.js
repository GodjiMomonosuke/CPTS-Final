const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

var ADRI1 = "https://drive.google.com/file/d/1HzFgWUmyDx56mIiblOg8yUOAixuuQpKg/preview"
var ADRI1_1 = "ให้เขียนโปรแกรมรับค่าของตัวแปรและแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI1_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 16.1 (1 คะแนน)"
var ADRI1_3 = "ถ้าต้องการให้ผลลัพธ์ของ a และ b มีค่าเท่ากับ 10 จะเขียนโค้ดเพิ่มอย่างไร ให้ใช้ Unary Operators คือ ++ หรือ -- (1 คะแนน)"
var ADRI2 = "https://drive.google.com/file/d/1VFbeJRnLZHIU6P_wuDwtpxphq3X6Ur6Z/preview"
var ADRI2_1 = "ให้เขียนโปรแกรมรับค่าของตัวแปรและแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI2_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 17.1 (1 คะแนน)"
var ADRI2_3 = "ถ้าต้องการแสดงค่า x, y, z, n ของการคำนวณสมการ x = y * 2 - 1 / z % 3 + n จะต้องแก้ไขโค้ดอย่างไร กำหนดให้ใส่ค่า x = 10, y = 20, z = 30 และ n = 40 (1 คะแนน)"
var ADRI3 = "https://drive.google.com/file/d/1TmBJbXa8_wAY7ODfsQihN8G8ctXCzb2V/preview"
var ADRI3_1 = "ให้เขียนโปรแกรมรับค่าของตัวแปรและแสดงผลลัพธ์ของสมการ a + b^(2n) - (4c - 5) สำหรับการยกกำลังให้ใช้ Library math.h (3 คะแนน)"
var ADRI3_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 18.1 (1 คะแนน)"
var ADRI3_3 = "ให้เขียนโปรแกรมรับค่าตัวแปร a, b, c จาก Keyboard เพื่อหาค่า x ของสมการดังนี้ (1 คะแนน) กำหนดให้ a = 1, b = -1, c = -6 และให้แสดงค่า x ทั้งสมการที่เป็นเครื่องหมาย + และที่เป็นเครื่องหมาย -"
var ADRI4 = "https://drive.google.com/file/d/1-91TH7mkgYYod5LGWU7IC5174T1pL0xd/preview"
var ADRI4_1 = "ให้เขียนโปรแกรมรับค่าของตัวแปรและแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI4_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 19.1 (1 คะแนน)"
var ADRI4_3 = "ถ้าต้องการให้ค่าผลลัพธ์ของ a > b && b < c เป็น 0 (เป็นเท็จ) และของ a == 10 || c == 20 เป็น 1 (เป็นจริง) จะต้องแก้ Operators ของทั้ง 2 คำสั่งอย่างไร โดยกำหนดให้ a = 20, b = 8, c = 43 เหมือนเดิม (1 คะแนน)"
var ADRI5 = "https://drive.google.com/file/d/1WtMD_X4lmzUvNvY9uyyjUsAF1rNTuXc_/preview"
var ADRI5_1 = "ให้เขียนโปรแกรม Point of Sale คำนวณราคาสินค้าพร้อมส่วนลด โดยให้รับค่าของตัวแปรและแสดงค่าของข้อมูลดังนี้ (3 คะแนน)"
var ADRI5_2 = "แสดงผลลัพธ์ที่ได้ ของข้อที่ 20.1 (1 คะแนน)"
var ADRI5_3 = "ถ้าต้องการเพิ่มสินค้าที่ 4 และในการแสดงใบเสร็จให้แสดง ชื่อ นาสกุล ของลูกค้า โดยให้รับค่าข้อมูลทาง Keyboard จะเขียนโปรแกรมอย่างไร สามารถกำหนดข้อมูลได้เอง (1 คะแนน)"


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

            res.render('student/pretest/4_Operators_and_Expressions-pretest', { person ,StudentAnswer,RecommendaResult,ADRI1,ADRI2,ADRI3,ADRI4,ADRI5});
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

  var currentQuiz = "Operators_and_Expressions-(Pre-test)" //*** */
  var timetodo = 0;

/** check score */
if(choice1 === 'A'){
  score1 = 1;
}
if(choice2 === 'B'){
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
if(choice6 === 'A'){
  score6 = 1;
}
if(choice7 === 'D'){
  score7 = 1;
}
if(choice8 === 'C'){
  score8 = 1;
}
if(choice9 === 'A'){
  score9 = 1;
}
if(choice10 === 'B'){
  score10 = 1;
}
if(choice11 === 'B'){
  score11 = 1;
}
if(choice12 === 'C'){
  score12 = 1;
}
if(choice13 === 'A'){
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

      res.redirect('/course-Operators_and_Expressions')    
  } catch (error) {
    next(error);
  }
});

module.exports = router;