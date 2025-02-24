const router = require('express').Router();
var compiler = require('compilex');
const { roles } = require('../../../utils/constants');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
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
                      if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'   && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Algorithms and Flowcharts",value:1});} 
                      if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'       && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Datatype and Variable",value:2});}
                      if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'            && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Input and Output",value:3});} 
                      if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'   && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Operators and Expressions",value:4});}
                      if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'        && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Selection Statements",value:5});}
                      if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'             && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Loop Statements",value:6});}
                      if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)'          && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Arrays and Strings",value:7});}
                      if (StudentAnswer[i].contentName ==='Functions-(Post-test)'                   && LV1 >= 3 && LV2 >= 3 && LV3 >= 3) {ArrCourseDone.push({key:"Functions",value:8});}
                      
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
                      var Sum_Pretest = result.scoreC1+result.scoreC2+result.scoreC3+result.scoreC4+result.scoreC11+result.scoreC5+result.scoreC6+result.scoreC7+result.scoreC8+result.scoreC9+result.scoreC10;
                      infoPrePostTest.push({Pre:[result.scoreC1,result.scoreC2,result.scoreC3,result.scoreC4,result.scoreC11,result.scoreC5,result.scoreC6,result.scoreC7,result.scoreC8,result.scoreC9,result.scoreC10,Sum_Pretest]})}
                    if (StudentAnswer[i].contentName === "Post-test"){
                      var Sum_Posttest = result.scoreC1+result.scoreC2+result.scoreC3+result.scoreC4+result.scoreC11+result.scoreC5+result.scoreC6+result.scoreC7+result.scoreC8+result.scoreC9+result.scoreC10;
                      infoPrePostTest.push({Post:[result.scoreC1,result.scoreC2,result.scoreC3,result.scoreC4,result.scoreC11,result.scoreC5,result.scoreC6,result.scoreC7,result.scoreC8,result.scoreC9,result.scoreC10,Sum_Posttest]}),PostTestDone = 1}
                    
                    if (StudentAnswer[i].contentName === "Algorithms_and_Flowcharts-(Pre-test)"){
                      var pre1done = StudentAnswer[i].timetodo;
                      var pre1LV1 = StudentAnswer[i].scoreLV1;
                      var pre1LV2 = StudentAnswer[i].scoreLV2;
                      var pre1LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre1LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre1LV4 = "⌛️"
                      }
                      var sumpre1 = pre1LV1+pre1LV2+pre1LV3+pre1LV4;
                    }
                    if (StudentAnswer[i].contentName === "Algorithms_and_Flowcharts-(Post-test)"){
                      var post1done = StudentAnswer[i].timetodo;
                      var post1LV1 = StudentAnswer[i].scoreLV1;
                      var post1LV2 = StudentAnswer[i].scoreLV2;
                      var post1LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "string"){
                        var post1LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post1LV4 = "⌛️"
                      }
                      var sumpost1 = post1LV1+post1LV2+post1LV3+post1LV4;
                    }
                    if (StudentAnswer[i].contentName === "Datatype_and_Variable-(Pre-test)"){
                      var pre2done = StudentAnswer[i].timetodo;
                      var pre2LV1 = StudentAnswer[i].scoreLV1;
                      var pre2LV2 = StudentAnswer[i].scoreLV2;
                      var pre2LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre2LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre2LV4 = "⌛️"
                      }
                      var sumpre2 = pre2LV1+pre2LV2+pre2LV3+pre2LV4;
                    }
                    if (StudentAnswer[i].contentName === "Datatype_and_Variable-(Post-test)"){
                      var post2done = StudentAnswer[i].timetodo;
                      var post2LV1 = StudentAnswer[i].scoreLV1;
                      var post2LV2 = StudentAnswer[i].scoreLV2;
                      var post2LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post2LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post2LV4 = "⌛️"
                      }
                      var sumpost2 = post2LV1+post2LV2+post2LV3+post2LV4;
                    }
                    if (StudentAnswer[i].contentName === "Input_and_Output-(Pre-test)"){
                      var pre3done = StudentAnswer[i].timetodo;
                      var pre3LV1 = StudentAnswer[i].scoreLV1;
                      var pre3LV2 = StudentAnswer[i].scoreLV2;
                      var pre3LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre3LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre3LV4 = "⌛️"
                      }
                      var sumpre3 = pre3LV1+pre3LV2+pre3LV3+pre3LV4;
                    }
                    if (StudentAnswer[i].contentName === "Input_and_Output-(Post-test)"){
                      var post3done = StudentAnswer[i].timetodo;
                      var post3LV1 = StudentAnswer[i].scoreLV1;
                      var post3LV2 = StudentAnswer[i].scoreLV2;
                      var post3LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post3LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post3LV4 = "⌛️"
                      }
                      var sumpost3 = post3LV1+post3LV2+post3LV3+post3LV4;
                    }
                    if (StudentAnswer[i].contentName === "Operators_and_Expressions-(Pre-test)"){
                      var pre4done = StudentAnswer[i].timetodo;
                      var pre4LV1 = StudentAnswer[i].scoreLV1;
                      var pre4LV2 = StudentAnswer[i].scoreLV2;
                      var pre4LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre4LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre4LV4 = "⌛️"
                      }
                      var sumpre4 = pre4LV1+pre4LV2+pre4LV3+pre4LV4;
                    }
                    if (StudentAnswer[i].contentName === "Operators_and_Expressions-(Post-test)"){
                      var post4done = StudentAnswer[i].timetodo;
                      var post4LV1 = StudentAnswer[i].scoreLV1;
                      var post4LV2 = StudentAnswer[i].scoreLV2;
                      var post4LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post4LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post4LV4 = "⌛️"
                      }
                      var sumpost4 = post4LV1+post4LV2+post4LV3+post4LV4;
                    }
                    if (StudentAnswer[i].contentName === "Selection_Statements-(Pre-test)"){
                      var pre5done = StudentAnswer[i].timetodo;
                      var pre5LV1 = StudentAnswer[i].scoreLV1;
                      var pre5LV2 = StudentAnswer[i].scoreLV2;
                      var pre5LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre5LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre5LV4 = "⌛️"
                      }
                      var sumpre5 = pre5LV1+pre5LV2+pre5LV3+pre5LV4;
                    }
                    if (StudentAnswer[i].contentName === "Selection_Statements-(Post-test)"){
                      var post5done = StudentAnswer[i].timetodo;
                      var post5LV1 = StudentAnswer[i].scoreLV1;
                      var post5LV2 = StudentAnswer[i].scoreLV2;
                      var post5LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post5LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post5LV4 = "⌛️"
                      }
                      var sumpost5 = post5LV1+post5LV2+post5LV3+post5LV4;
                    }
                    if (StudentAnswer[i].contentName === "Loop_Statements-(Pre-test)"){
                      var pre6done = StudentAnswer[i].timetodo;
                      var pre6LV1 = StudentAnswer[i].scoreLV1;
                      var pre6LV2 = StudentAnswer[i].scoreLV2;
                      var pre6LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre6LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre6LV4 = "⌛️"
                      }
                      var sumpre6 = pre6LV1+pre6LV2+pre6LV3+pre6LV4;
                    }
                    if (StudentAnswer[i].contentName === "Loop_Statements-(Post-test)"){
                      var post6done = StudentAnswer[i].timetodo;
                      var post6LV1 = StudentAnswer[i].scoreLV1;
                      var post6LV2 = StudentAnswer[i].scoreLV2;
                      var post6LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post6LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post6LV4 = "⌛️"
                      }
                      var sumpost6 = post6LV1+post6LV2+post6LV3+post6LV4;
                    }
                    if (StudentAnswer[i].contentName === "Arrays_and_Strings-(Pre-test)"){
                      var pre7done = StudentAnswer[i].timetodo;
                      var pre7LV1 = StudentAnswer[i].scoreLV1;
                      var pre7LV2 = StudentAnswer[i].scoreLV2;
                      var pre7LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre7LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre7LV4 = "⌛️"
                      }
                      var sumpre7 = pre7LV1+pre7LV2+pre7LV3+pre7LV4;
                    }
                    if (StudentAnswer[i].contentName === "Arrays_and_Strings-(Post-test)"){
                      var post7done = StudentAnswer[i].timetodo;
                      var post7LV1 = StudentAnswer[i].scoreLV1;
                      var post7LV2 = StudentAnswer[i].scoreLV2;
                      var post7LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post7LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post7LV4 = "⌛️"
                      }
                      var sumpost7 = post7LV1+post7LV2+post7LV3+post7LV4;
                    }
                    if (StudentAnswer[i].contentName === "Functions-(Pre-test)"){
                      var pre8done = StudentAnswer[i].timetodo;
                      var pre8LV1 = StudentAnswer[i].scoreLV1;
                      var pre8LV2 = StudentAnswer[i].scoreLV2;
                      var pre8LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var pre8LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        pre8LV4 = "⌛️"
                      }
                      var sumpre8 = pre8LV1+pre8LV2+pre8LV3+pre8LV4;
                    }
                    if (StudentAnswer[i].contentName === "Functions-(Post-test)"){
                      var post8done = StudentAnswer[i].timetodo;
                      var post8LV1 = StudentAnswer[i].scoreLV1;
                      var post8LV2 = StudentAnswer[i].scoreLV2;
                      var post8LV3 = StudentAnswer[i].scoreLV3;
                      if(typeof(StudentAnswer[i].scoreTeacher) === "number"){
                        var post8LV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{
                        post8LV4 = "⌛️"
                      }
                      var sumpost8 = post8LV1+post8LV2+post8LV3+post8LV4;
                    }
                    
                  }

                if(PostTestStatus === 0 || PostTestDone === 1){ //if all course not done || post-test done 
                  res.render('student/course/course_main', { person ,Sum_Pretest, StudentAnswer,RecommendaResult ,PostTestDone,infoPrePostTest,
                    pre1done,pre2done,pre3done,pre4done,pre5done,pre6done,pre7done,pre8done,
                    pre1LV1,pre2LV1,pre3LV1,pre4LV1,pre5LV1,pre6LV1,pre7LV1,pre8LV1,
                    pre1LV2,pre2LV2,pre3LV2,pre4LV2,pre5LV2,pre6LV2,pre7LV2,pre8LV2,
                    pre1LV3,pre2LV3,pre3LV3,pre4LV3,pre5LV3,pre6LV3,pre7LV3,pre8LV3,
                    pre1LV4,pre2LV4,pre3LV4,pre4LV4,pre5LV4,pre6LV4,pre7LV4,pre8LV4,
                    post1done,post2done,post3done,post4done,post5done,post6done,post7done,post8done,
                    post1LV1,post2LV1,post3LV1,post4LV1,post5LV1,post6LV1,post7LV1,post8LV1,
                    post1LV2,post2LV2,post3LV2,post4LV2,post5LV2,post6LV2,post7LV2,post8LV2,
                    post1LV3,post2LV3,post3LV3,post4LV3,post5LV3,post6LV3,post7LV3,post8LV3,
                    post1LV4,post2LV4,post3LV4,post4LV4,post5LV4,post6LV4,post7LV4,post8LV4,
                    sumpre1,sumpre2,sumpre3,sumpre4,sumpre5,sumpre6,sumpre7,sumpre8,
                    sumpost1,sumpost2,sumpost3,sumpost4,sumpost5,sumpost6,sumpost7,sumpost8
                  });
                }
                if(PostTestStatus === 1 && PostTestDone === 0){ //if all course done && post-test not done
                  res.render('student/course/course_main', { person , StudentAnswer,RecommendaResult ,PostTestDone,infoPrePostTest,
                    pre1done,pre2done,pre3done,pre4done,pre5done,pre6done,pre7done,pre8done,
                    pre1LV1,pre2LV1,pre3LV1,pre4LV1,pre5LV1,pre6LV1,pre7LV1,pre8LV1,
                    pre1LV2,pre2LV2,pre3LV2,pre4LV2,pre5LV2,pre6LV2,pre7LV2,pre8LV2,
                    pre1LV3,pre2LV3,pre3LV3,pre4LV3,pre5LV3,pre6LV3,pre7LV3,pre8LV3,
                    pre1LV4,pre2LV4,pre3LV4,pre4LV4,pre5LV4,pre6LV4,pre7LV4,pre8LV4,
                    post1done,post2done,post3done,post4done,post5done,post6done,post7done,post8done,
                    post1LV1,post2LV1,post3LV1,post4LV1,post5LV1,post6LV1,post7LV1,post8LV1,
                    post1LV2,post2LV2,post3LV2,post4LV2,post5LV2,post6LV2,post7LV2,post8LV2,
                    post1LV3,post2LV3,post3LV3,post4LV3,post5LV3,post6LV3,post7LV3,post8LV3,
                    post1LV4,post2LV4,post3LV4,post4LV4,post5LV4,post6LV4,post7LV4,post8LV4,
                    sumpre1,sumpre2,sumpre3,sumpre4,sumpre5,sumpre6,sumpre7,sumpre8,
                    sumpost1,sumpost2,sumpost3,sumpost4,sumpost5,sumpost6,sumpost7,sumpost8
                  });
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
  var currentQuiz = ""
  var timetodo = ""
  var times = ""

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mydatabase);
    var myobj = { 
      timetodo:timetodo,
      times: times, 
      email: person.email,
      role:person.role,
      contentName:currentQuiz,
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

