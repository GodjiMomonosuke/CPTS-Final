const router = require('express').Router();
var compiler = require('compilex');
const { roles } = require('../../../utils/constants');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:1234@cluster0.ormtjkb.mongodb.net";
const mydatabase = "Cluster0";

router.get('/', async (req, res, next) => {
  const person = req.user;
    if(person != undefined){
      // PRETEST Check
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var query = { email: person.email };
        dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
          if(Object.keys(StudentAnswer).length === 0){ // PRETEST Check
            res.redirect('/')
          }

          else{
            var PostTestStatus = 0 , PostTestDone = 0; 

            //////********RECOMMENDATION*********** */

                MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db(mydatabase);
                  var query = {email:person.email};
                  dbo.collection("StudentRecommendation").find(query).toArray(function(err, RecommendaResult) {
                    if (err) throw err;

                   //หาคอร์สที่เรียนไป แล้วกรองไม้ให้ซ้ำกัน
                   var ArrCourseDone = [];
                   for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {        //value คือ ความยาก ง่าย - 1 ยาก - 9
                     var LV1 = StudentAnswer[i].scoreLV1 , LV2 = StudentAnswer[i].scoreLV2 , LV3 = StudentAnswer[i].scoreLV3;
                      if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'   && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Algorithms and Flowcharts",value:1});} 
                      if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'       && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Datatype and Variable",value:2});}
                      if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'            && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Input and Output",value:3});} 
                      if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'   && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Operators and Expressions",value:4});}
                      if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'        && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Selection Statements",value:5});}
                      if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'             && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Loop Statements",value:6});}
                      if (StudentAnswer[i].contentName ==='Arrays_and_String-(Post-test)'           && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Arrays and Strings",value:7});}
                      if (StudentAnswer[i].contentName ==='Functions-(Post-test)'                   && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Functions",value:8});}
                      
                   }
                   
                    let CourseDonedictionary = Object.assign({}, ...ArrCourseDone.map((x) => ({[x.key]: x.value}))); //Array to dictionary
                    var items = Object.keys(CourseDonedictionary).map( //sort dictionary
                      (key) => { return [key, CourseDonedictionary[key]] });
                    items.sort(
                      (first, second) => { return first[1] - second[1] }
                    );
                    // CourseDoneSorted คือ คอร์สที่ทำเสร็จรวมกับ ความยาก
                    var CourseDoneSorted = items.map(
                      (e) => { return e[0] });


                    
                    // StudentAnswer คือ ข้อมูลคะแนนนักเรียนที่ดึงจาก Database 
                    // RecommendaResult[0].RecommendationType คือ วิธีแนะนำที่ผู้เรียนเลือก
 
                    var RecommendOutput = [];
                    var CourseTotol = ['Algorithms and Flowcharts','Datatype and Variable','Input and Output','Operators and Expressions','Selection Statements','Loop Statements','Arrays and Strings','Functions'] //เรียกจากง่ายไปยาก เปรียบเทียบที่เหมือนกับ path_left หาตัวที่ต่าง เพื่อเลือกตัวง่ายสุดแสดงผล (ไม่รวม file operation)
                    var Course_Left = [];
                    var ArrRankStorage = []
                    
                    var PathTicketBookingSystem = ['Algorithms and Flowcharts','Datatype and Variable','Input and Output','Operators and Expressions','Selection Statements','Loop Statements','Arrays and Strings','Functions']
                    var PathPointofSalesSystem  = ['Algorithms and Flowcharts','Datatype and Variable','Input and Output','Operators and Expressions','Selection Statements','Loop Statements','Arrays and Strings','Functions'] 
                    var PathProjectQUIZ3     = ['Algorithms and Flowcharts','Datatype and Variable','Input and Output','Operators and Expressions','Selection Statements','Loop Statements','Arrays and Strings','Functions'] 
                    //ตรวจสอบคอร์สที่ทำ กับ แต่ละ path
                    var b = new Set(CourseDoneSorted);
                    var DiffTicketBookingSystem = [...PathTicketBookingSystem].filter(x => !b.has(x));
                    var DiffPointofSalesSystem = [...PathPointofSalesSystem].filter(x => !b.has(x));
                    var DiffProjectQUIZ3 = [...PathProjectQUIZ3].filter(x => !b.has(x));
                   
                    var DiffTotal = [...CourseTotol].filter(x => !b.has(x)); //ตรวจสอบ course ที่เหลืออยู่ทั้งหมด
                    
                    if(Object.keys(RecommendaResult).length !== 0){
                      //ถ้ายังเรียนไม่ครบ จะสามารถแนะนำได้
                      if(Object.keys(DiffTotal).length !== 0){
                        //***RECOMMEND : COURSE
                        if(RecommendaResult[0].RecommendationType === "Fastest Path"){
                          //ตรวจสอบว่ายังมีคอร์สเหลือไหม && เก็บข้อมูลเพื่อส่งต่อ
                          if(DiffTicketBookingSystem.length != 0) {Course_Left.push({CourseName:"TicketBookingSystem-(Project_quiz1)"   ,length:DiffTicketBookingSystem.length  ,CourseLEFT :DiffTicketBookingSystem})}
                          if(DiffPointofSalesSystem.length != 0)  {Course_Left.push({CourseName:"PointofSalesSystem-(Project_quiz2)"    ,length:DiffPointofSalesSystem.length   ,CourseLEFT :DiffPointofSalesSystem})}
                          if(DiffProjectQUIZ3.length != 0)        {Course_Left.push({CourseName:"ProjectQUIZ3"                          ,length:DiffProjectQUIZ3.length         ,CourseLEFT :DiffProjectQUIZ3})}
                          //หา path ที่น้อยที่สุด
                          var rankCourse_left = Course_Left.sort(function (a, b) {return a.length - b.length;});
                          if(rankCourse_left[1] === undefined){ //ตรวจสอบค่าเปรียบเทียบว่ามีให้เปรียบเทียบไหม
                            // มี path น้อยสุดเพียง 1 path
                            RecommendOutput.push(rankCourse_left[0].CourseLEFT[0]);
                          }
                          else{
                            // มี path เหมือกัน 2 path
                            if (Object.keys(rankCourse_left[0]).length === Object.keys(rankCourse_left[1]).length){
                              ArrRankStorage.push(rankCourse_left[0].CourseLEFT[0],rankCourse_left[1].CourseLEFT[0])
                              let uniqueArr = [...new Set(ArrRankStorage)];
                              const intersection = uniqueArr.filter(element => CourseTotol.includes(element));
                              RecommendOutput = intersection;
                              }
                              // มี path เหมือกัน 3 path
                              else if (Object.keys(rankCourse_left[0]).length === Object.keys(rankCourse_left[1]).length ||Object.keys(rankCourse_left[0]).length === Object.keys(rankCourse_left[2]).length ){
                                ArrRankStorage.push(rankCourse_left[0].CourseLEFT[0],rankCourse_left[1].CourseLEFT[0],rankCourse_left[2].CourseLEFT[0])
                                let uniqueArr = [...new Set(ArrRankStorage)];
                                const intersection = uniqueArr.filter(element => CourseTotol.includes(element));
                                RecommendOutput = intersection;
                              }
                              // มี path เหมือกัน 4 path
                              else if (Object.keys(rankCourse_left[0]).length === Object.keys(rankCourse_left[1]).length ||Object.keys(rankCourse_left[0]).length === Object.keys(rankCourse_left[2]).length ||Object.keys(rankCourse_left[0]).length === Object.keys(rankCourse_left[3]).length ){
                                ArrRankStorage.push(rankCourse_left[0].CourseLEFT[0],rankCourse_left[1].CourseLEFT[0],rankCourse_left[2].CourseLEFT[0],rankCourse_left[3].CourseLEFT[0])
                                let uniqueArr = [...new Set(ArrRankStorage)];
                                const intersection = uniqueArr.filter(element => CourseTotol.includes(element));
                                RecommendOutput = intersection;
                              }
                              // มี path เหมือกัน 5 path หรือ เท่ากันทั้งหมด จะแนะนำ course ที่ไม่ได้่ทำที่ง่ายที่สุด
                              else{RecommendOutput = DiffTotal}
                          }
                        }
                          //***RECOMMEND : PROJECT ถ้าเลือก path มาก็จะแนะนำ คอร์ส ที่ง่ายที่สุด
                          else if(RecommendaResult[0].RecommendationType === "TicketBookingSystem-(Project_quiz1)"  ){ RecommendOutput = DiffTicketBookingSystem  }
                          else if(RecommendaResult[0].RecommendationType === "PointofSalesSystem-(Project_quiz2)"    ){ RecommendOutput = DiffPointofSalesSystem    }
                          else if(RecommendaResult[0].RecommendationType === "ProjectQUIZ3"   ){ RecommendOutput = DiffProjectQUIZ3   }
                          
                          if(Object.keys(RecommendOutput).length === 0){  RecommendOutput = "โปรดเลือกการแนะนำ" } //ถ้า คอร์ส ใน path หมดแล้ว
                          else{RecommendOutput = RecommendOutput[0]}    //เลือกตัวแรกของ array = ตัวที่ง่ายที่สุด
                        
                      }
                      else { //ไม่เหลือ node (คอร์ส หรือ บทเรียน) ให้แนะนำ
                        RecommendOutput = "สิ้นสุดการแนะนำ"
                        PostTestStatus = 1;
                    } 
                      
                    }


                    //////********End RECOMMENDATION System *********** */
                  MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db(mydatabase);
                    var myquery = { email: person.email };
                    var newvalues = { $set: {RecommendCourse: RecommendOutput } };
                    dbo.collection("StudentRecommendation").updateOne(myquery, newvalues, function(err, res) {
                      if (err) throw err;
                      db.close();
                    });
                  });
                  //////********END RECOMMENDATION*********** */

                  //***PROJECT UNLOCK */
                  var TicketBooking_SystemPercent = Math.round(((PathTicketBookingSystem.length-DiffTicketBookingSystem.length)/PathTicketBookingSystem.length)*100)
                    var PointofSales_SystemPercent = Math.round(((PathPointofSalesSystem.length-DiffPointofSalesSystem.length)/PathPointofSalesSystem.length)*100)
                    var ProjectQUIZ3Percent = Math.round(((PathProjectQUIZ3.length-DiffProjectQUIZ3.length)/PathProjectQUIZ3.length)*100)

                  MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db(mydatabase);
                    var query = { email:person.email };
                    dbo.collection("StudentProject").find(query).toArray(function(err, StudentProjectresult) {
                      if (err) throw err;


                      if(Object.keys(StudentProjectresult).length === 0){
                        MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db(mydatabase);
                          var myobj = { email:person.email,TicketBooking_SystemPercent:TicketBooking_SystemPercent, PointofSales_SystemPercent:PointofSales_SystemPercent,ProjectQUIZ3Percent:ProjectQUIZ3Percent};
                          dbo.collection("StudentProject").insertOne(myobj, function(err, res) {
                            if (err) throw err;
                            db.close();
                          });
                        });

                      }
                      else{
                        MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db(mydatabase);
                          var myquery = { email: person.email };
                          var newvalues = { $set: {TicketBooking_SystemPercent:TicketBooking_SystemPercent, PointofSales_SystemPercent:PointofSales_SystemPercent,ProjectQUIZ3Percent:ProjectQUIZ3Percent} };
                          dbo.collection("StudentProject").updateOne(myquery, newvalues, function(err, res) {
                            if (err) throw err;
                            db.close();
                          });
                        });

                      }
                    });
                  });
                   //***End Of PROJECT UNLOCK */


                var infoPrePostTest = [{ Name:["Algorithms and Flowcharts","Datatype and Variable","Input and Output","Operators and Expressions","Selection Statements","Loop Statements","Arrays and Strings","Functions","_Summary"]}]
                  for (let i = 0; i < Object.keys(StudentAnswer).length; i++){
                    var result = StudentAnswer[i];
                    
                    if (StudentAnswer[i].contentName === "Pre-test"){
                      let Sum_Pretest = result.scoreC1+result.scoreC2+result.scoreC3+result.scoreC4+result.scoreC11+result.scoreC5+result.scoreC6+result.scoreC7+result.scoreC8+result.scoreC9+result.scoreC10;
                      infoPrePostTest.push({Pre:[result.scoreC1,result.scoreC2,result.scoreC3,result.scoreC4,result.scoreC11,result.scoreC5,result.scoreC6,result.scoreC7,result.scoreC8,result.scoreC9,result.scoreC10,Sum_Pretest]})}
                    if (StudentAnswer[i].contentName === "Post-test"){
                      let Sum_Posttest = result.scoreC1+result.scoreC2+result.scoreC3+result.scoreC4+result.scoreC11+result.scoreC5+result.scoreC6+result.scoreC7+result.scoreC8+result.scoreC9+result.scoreC10;
                      infoPrePostTest.push({Post:[result.scoreC1,result.scoreC2,result.scoreC3,result.scoreC4,result.scoreC11,result.scoreC5,result.scoreC6,result.scoreC7,result.scoreC8,result.scoreC9,result.scoreC10,Sum_Posttest]}),PostTestDone = 1}
                  }

                if(PostTestStatus === 0 || PostTestDone === 1){ //if all course not done || post-test done 
                  res.render('student/course/course_main', { person ,StudentAnswer,RecommendaResult ,PostTestDone,infoPrePostTest});
                }
                if(PostTestStatus === 1 && PostTestDone === 0){ //if all course done && post-test not done
                  res.render('student/posttest', { person });
                }
                if(PostTestDone === 1){ //post-test done 
                  MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db(mydatabase);
                    var myquery = { email:person.email };
                    var newvalues = { $set: {infoPrePostTest: infoPrePostTest} };
                    dbo.collection("StudentClass").updateOne(myquery, newvalues, function(err, res) {
                      if (err) throw err;
                      db.close();
                    });
                  });
                }
                
              });
            });

            
          }
          db.close();
        });
      });
      // PRETEST Check
  }
});

router.post('/posttestSubmit', async (req, res, next) => {
  const person = req.user;
  var currentQuiz = "Post-test"
  var scoreC1=0,scoreC2=0,scoreC3=0,scoreC4=0,scoreC5=0,scoreC6=0,scoreC7=0,scoreC8=0,scoreC9=0,scoreC10=0,scoreC11=0;
  var c11 = req.body.c11;
  var c12 = req.body.c12;
  var c13 = req.body.c13;
  var c21 = req.body.c21;
  var c22 = req.body.c22;
  var c23 = req.body.c23;
  var c31 = req.body.c31;
  var c32 = req.body.c32;
  var c33 = req.body.c33;
  var c41 = req.body.c41;
  var c42 = req.body.c42;
  var c43 = req.body.c43;
  var c51 = req.body.c51;
  var c52 = req.body.c52;
  var c53 = req.body.c53;
  var c61 = req.body.c61;
  var c62 = req.body.c62;
  var c63 = req.body.c63;
  var c71 = req.body.c71;
  var c72 = req.body.c72;
  var c73 = req.body.c73;
  var c81 = req.body.c81;
  var c82 = req.body.c82;
  var c83 = req.body.c83;
  var c91 = req.body.c91;
  var c92 = req.body.c92;
  var c93 = req.body.c93;
  var c101 = req.body.c101;
  var c102 = req.body.c102;
  var c103 = req.body.c103;
  var c111 = req.body.c111; //Loop Statement
  var c112 = req.body.c112; //Loop Statement
  var c113 = req.body.c113;  //Loop Statement

  /* 1.Syntax */
  if (c11 === 'C') {scoreC1 = scoreC1 + 1;}
  if (c12 === 'B') {scoreC1 = scoreC1 + 1;}
  if (c13 === 'C') {scoreC1 = scoreC1 + 1;}
  /* 2.Data Type, Output */
  if (c21 === 'C') {scoreC2 = scoreC2 + 1;}
  if (c22 === 'D') {scoreC2 = scoreC2 + 1;}
  if (c23 === 'A') {scoreC2 = scoreC2 + 1;}
  /* 3.Operators */
  if (c31 === 'B') {scoreC3 = scoreC3 + 1;}
  if (c32 === 'A') {scoreC3 = scoreC3 + 1;}
  if (c33 === 'D') {scoreC3 = scoreC3 + 1;} 
  /* 4.Flow Control */
  if (c41 === 'C') {scoreC4 = scoreC4 + 1;}
  if (c42 === 'C') {scoreC4 = scoreC4 + 1;}
  if (c43 === 'C') {scoreC4 = scoreC4 + 1;}
  /* 5.Array */
  if (c51 === 'C') {scoreC5 = scoreC5 + 1;}
  if (c52 === 'B') {scoreC5 = scoreC5 + 1;}
  if (c53 === 'B') {scoreC5 = scoreC5 + 1;}
  /* 6.Input Output */
  if (c61 === 'C') {scoreC6 = scoreC6 + 1;}
  if (c62 === 'C') {scoreC6 = scoreC6 + 1;}
  if (c63 === 'A') {scoreC6 = scoreC6 + 1;}
  /* 7.Pointers */
  if (c71 === 'A') {scoreC7 = scoreC7 + 1;}
  if (c72 === 'C') {scoreC7 = scoreC7 + 1;}
  if (c73 === 'A') {scoreC7 = scoreC7 + 1;}
  /* 8.Strings */
  if (c81 === 'B') {scoreC8 = scoreC8 + 1;}
  if (c82 === 'C') {scoreC8 = scoreC8 + 1;}
  if (c83 === 'A') {scoreC8 = scoreC8 + 1;}
  /* 9.Structure */
  if (c91 === 'C') {scoreC9 = scoreC9 + 1;}
  if (c92 === 'D') {scoreC9 = scoreC9 + 1;}
  if (c93 === 'B') {scoreC9 = scoreC9 + 1;}
  /* 10.Function */
  if (c101 === 'C') {scoreC10 = scoreC10 + 1;}
  if (c102 === 'B') {scoreC10 = scoreC10 + 1;}
  if (c103 === 'D') {scoreC10 = scoreC10 + 1;} 
  /* 11.Loop */
  if (c111 === 'B') {scoreC11 = scoreC11 + 1;  }
  if (c112 === 'D') {scoreC11 = scoreC11 + 1;  }
  if (c113 === 'C') {scoreC11 = scoreC11 + 1;  }
  /** */

 


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mydatabase);
    var myobj = { 
      timetodo:1,
      times: new Date().toLocaleString(), 
      email: person.email,
      role:person.role,
      contentName:currentQuiz,
      scoreC1:scoreC1, //Intro
      scoreC2:scoreC2,  //String
      scoreC3:scoreC3,  //Datatype
      scoreC4:scoreC4,
      scoreC5:scoreC5,
      scoreC6:scoreC6,
      scoreC7:scoreC7,
      scoreC8:scoreC8,
      scoreC9:scoreC9,
      scoreC10:scoreC10,  //Array
      scoreC11:scoreC11  //Array
    };
    dbo.collection("StudentAnswer").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
  res.redirect('/')   
 
    try {         
    } catch (error) {
      next(error);
    }
  });
module.exports = router;

