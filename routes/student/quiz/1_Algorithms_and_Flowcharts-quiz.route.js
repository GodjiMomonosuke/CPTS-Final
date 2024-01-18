const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:1234@cluster0.ormtjkb.mongodb.net";
const mydatabase = "Cluster0";

var ADRI = "https://drive.google.com/file/d/1wQOAcBxYwUJix_06JzJJ48aqGBKDN7WF/preview" 
var ADRI_Expect = "เขียนโปรแกรม C เพื่อพิมพ์ 'A-Z' ตัวใหญ่ โดยเลือก 1 ตัวอักษร (ยกเว้นตัว C)" 
var ADRI_Answer = "https://drive.google.com/file/d/1GfNE8Tlxo7FVYWdglVp-uikdJzchQSUj/preview"

router.get('/', async (req, res, next) => { //ย่อโค้ดนี้ลงเลย
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

            res.render('student/quiz/1_Algorithms_and_Flowcharts-quiz', { person ,StudentAnswer,RecommendaResult,ADRI,ADRI_Expect});
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
  


  var currentQuiz = "Algorithms and Flowcharts (Post-test)"
  var timetodo = 0;

  
 
  /** check score */ 
  if(choice1 === 'B'){
    score1 = 1;
  }
  if(choice2 === 'A'){
    score2 = 1;
  }
  if(choice3 === 'A'){
    score3 = 1;
  }
  if(choice4 === 'D'){
    score4 = 1;
  }
  if(choice5 === 'A'){
    score5 = 1;
  }
  if(choice6 === 'D'){
    score6 = 1;
  }
  if(choice7 === 'A'){
    score7 = 1;
  }
  if(choice8 === 'C'){
    score8 = 1;
  }
  if(choice9 === 'C'){
    score9 = 1;
  }
  if(choice10 === 'B'){
    score10 = 1;
  }
  if(choice11 === 'right'){
    score11 = 1;//ตรวจคำตอบข้อ 3 ต้องไปที่ public\javascripts\lv3 (เรียงให้ถูก)
  }
  if(choice12 === 'A'){
    score12 = 1;
  }
  if(choice13 === 'B'){
    score13 = 1;
  }
  if(choice14 === 'A'){
    score14 = 1;
  }
  if(choice15 === 'c'){
    score15 = 1;
  }
  
  


  /** compiler */
  var envData = { OS : "linux" , cmd : "gcc" };
  compiler.compileCPP(envData , code , function (data) {
    //compiler.compileCPP(envData , code , function (data) {
        var dataOut = data.output;
        if(dataOut === undefined || dataOut === null) {dataOut = "error"}
        else {} ;
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
                role:person.role,
                contentName:currentQuiz,
                scoreLV1:score1+score2+score3+score4+score5,
                Q1:req.body.choice1,
                Q2:req.body.choice2,
                Q3:req.body.choice3,
                Q4:req.body.choice4,
                Q5:req.body.choice4,
                scoreLV2:score6+score7+score8+score9+score10,
                Q6:req.body.choice6,
                Q7:req.body.choice7,
                Q8:req.body.choice8,
                Q9:req.body.choice9,
                Q10:req.body.choice10,
                scoreLV3:score11+score12+score13+score14+score15,
                Q11:req.body.choice11,
                Q12:req.body.choice12,
                Q13:req.body.choice13,
                Q14:req.body.choice14,
                Q15:req.body.choice15,
                lang:lang,
                Q16_1:code,
                Q16_2:expResult16,
                Q16_3:sendLink16,
                Q17_1:sendLink171,
                Q17_2:expResult17,
                Q17_3:sendLink172,
                Q18_1:sendLink181,
                Q18_2:expResult18,
                Q18_3:sendLink182,
                Q19_1:sendLink191,
                Q19_2:expResult19,
                Q19_3:sendLink192,
                Q20_1:sendLink201,
                Q20_2:expResult20,
                Q20_3:sendLink202,
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