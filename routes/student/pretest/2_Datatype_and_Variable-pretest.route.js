const router = require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:1234@cluster0.ormtjkb.mongodb.net";
const mydatabase = "Cluster0";

var ADRI = "https://drive.google.com/file/d/1IiFyAh1teNLEvMVvqYFo_SR__kBQYwFI/preview"
var ADRI_Expect = "ทำการเพิ่มใส่นามสกุลเข้าไปโดยให้รหัสนักศึกษาแสดงออกมาท้ายสุด"
var ADRI_Answer = "https://drive.google.com/file/d/1M8DU6l8MTxe6UIc426o4Ofyl98KF9xu1/preview"

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
        res.redirect('/course-Algorithms_and_Flowcharts-quiz')
      }
      else{
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var query = {email:person.email};
          dbo.collection("StudentRecommendation").find(query).toArray(function(err, RecommendaResult) {
            if (err) throw err;

            res.render('student/pretest/2_Datatype_and_Variable-pretest', { person ,StudentAnswer,RecommendaResult,ADRI,ADRI_Expect});
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

  var currentQuiz = "Datatype_and_Variable-(Pre-test)" //*** */
  var timetodo = 0;

  /** chekc score */
  if(choice1 === 'C'){
    score1 = 1;
  }
  if(choice2 === 'C'){
    score2 = 1;
  }
  if(choice3 === 'A'){
    score3 = 1;
  }
  if(choice4 === 'C'){
    score4 = 1;
  }
  if(choice5 === 'A'){
    score5 = 1;
  }
  if(choice6 === 'B'){
    score6 = 1;
  }
  if(choice7 === 'B'){
    score7 = 1;
  }
  if(choice8 === 'A'){
    score8 = 1;
  }
  if(choice9 === 'D'){
    score9 = 1;
  }
  if(choice10 === 'C'){
    score10 = 1;
  }
  if(choice11 === 'right'){
    score11 = 1;//ตรวจคำตอบข้อ 3 ต้องไปที่ public\javascripts\lv3 (เรียงให้ถูก)
  }
  if(choice12 === 'A'){
    score12 = 1;
  }
  if(choice13 === 'A'){
    score13 = 1;
  }
  if(choice14 === 'D'){
    score14 = 1;
  }
  if(choice15 === 'D'){
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
                role:person.role,
                contentName:currentQuiz,
                scorePre1:score1+score2+score3+score4+score5,
                scorePre2:score6+score7+score8+score9+score10,
                scorePre3:score11+score12+score13+score14+score15,
                lang:lang,
                code:code,
                output:dataOut,
                expResult16:expResult16,
                expResult17:expResult17,
                expResult18:expResult18,
                expResult19:expResult19,
                expResult20:expResult20,
                sendLink16:sendLink16,
                sendLink171:sendLink171,
                sendLink172:sendLink172,
                sendLink181:sendLink181,
                sendLink182:sendLink182,
                sendLink191:sendLink191,
                sendLink192:sendLink192,
                sendLink201:sendLink201,
                sendLink202:sendLink202,
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