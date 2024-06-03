const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:1234@cluster0.ormtjkb.mongodb.net";



const mydatabase = "Cluster0";

router.post('/pretestSubmit', async (req, res, next) => {
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
  res.redirect('back')   
 
    try {         
    } catch (error) {
      next(error);
    }
  });

router.get('/', async (req, res, next) => {

  const person = req.user;
  if(person != undefined){
    if(person.role === "ADMIN"){
      res.render('index/index_admin', { person });
    }
    if(person.role === "Teacher"){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var query = { email:/.*m.*/ };
        dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
          if (err) throw err;
          db.close();

          var BasicScore =0;
          var TraceScore =0;
          var ExplainScore =0;
          var WriteScore =0;
          var studentAll = Object.keys(StudentAnswer).length;
          
          var IntroductionScore=0,IntroductionCount=0;
          var StringScore=0,StringCount=0;
          var DatatypeScore=0,DatatypeCount=0;
          var OperatorsScore=0,OperatorsCount=0;
          var FlowControlScore=0,FlowControlCount =0;
          var PointersScore=0,PointersCount=0;
          var FunctionScore=0,FunctionCount=0;
          var StructureScore=0,StructureCount=0;
          var ArrayScore=0,ArrayCount=0;

          var TicTacToeScore=0,TicTacToeCount=0;
          var LibrarySystemScore=0,LibrarySystemCount=0;
          var RoshamboScore=0,RoshamboCount=0;

          
          for(let i = 0; i < studentAll; i++) {

            if( StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)' ){
              if(StudentAnswer[i].scoreTeacher === undefined){
                IntroductionScore = IntroductionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                IntroductionScore = IntroductionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
              IntroductionCount++;
            }
            if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                StringScore =StringScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                StringScore =StringScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
              StringCount++;
            }
            if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                DatatypeScore =DatatypeScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                DatatypeScore =DatatypeScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                DatatypeCount++;
            } 
            if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                OperatorsScore =OperatorsScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                OperatorsScore =OperatorsScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                OperatorsCount++;
            }
            if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                FlowControlScore =FlowControlScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                FlowControlScore =FlowControlScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                FlowControlCount++;
            }
            if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                PointersScore = PointersScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                PointersScore = PointersScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                PointersCount++;
            }
            if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                FunctionScore = FunctionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                FunctionScore = FunctionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                FunctionCount++;
            }
            if (StudentAnswer[i].contentName ==='Functions-(Post-test)') {   
                if(StudentAnswer[i].scoreTeacher === undefined){
                  StructureScore = StructureScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
                else{
                  StructureScore = StructureScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                  StructureCount++;
            }
            
            /** */

            if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                TicTacToeScore = TicTacToeScore+parseInt(StudentAnswer[i].scoreTeacher);}
                TicTacToeCount++;
            }
            if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                LibrarySystemScore = LibrarySystemScore+parseInt(StudentAnswer[i].scoreTeacher);}
                LibrarySystemCount++;
            }
            if (StudentAnswer[i].contentName ==='Project_QUIZ3') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                RoshamboScore = RoshamboScore+parseInt(StudentAnswer[i].scoreTeacher);}
                RoshamboCount++;
            }
            
           

            if( StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)' ||
                StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)' || 
                StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)' ||
                StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)' ||
                StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)' ||
                StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)' ||
                StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)' ||
                StudentAnswer[i].contentName ==='Functions-(Post-test)'
              ){
                if(StudentAnswer[i].scoreTeacher === undefined){
                  BasicScore = BasicScore+StudentAnswer[i].scoreLV1
                  TraceScore = TraceScore+StudentAnswer[i].scoreLV2
                  ExplainScore = ExplainScore+StudentAnswer[i].scoreLV3
                }
                else{
                  BasicScore = BasicScore+StudentAnswer[i].scoreLV1
                  TraceScore = TraceScore+StudentAnswer[i].scoreLV2
                  ExplainScore = ExplainScore+StudentAnswer[i].scoreLV3
                  WriteScore = WriteScore+parseInt(StudentAnswer[i].scoreTeacher);
                }
              }
          }


          if(IntroductionScore != 0) IntroductionScore = IntroductionScore/IntroductionCount;
          if(StringScore != 0) StringScore = StringScore/StringCount;
          if(DatatypeScore !=0) DatatypeScore = DatatypeScore/DatatypeCount;
          if(OperatorsScore != 0)OperatorsScore = OperatorsScore/OperatorsCount;
          if(FlowControlScore != 0)FlowControlScore = FlowControlScore/FlowControlCount;
          if(PointersScore != 0)PointersScore = PointersScore/PointersCount;
          if(FunctionScore != 0)FunctionScore = FunctionScore/FunctionCount;
          if(StructureScore != 0)StructureScore = StructureScore/StructureCount;

          if(TicTacToeScore != 0) TicTacToeScore = TicTacToeScore/TicTacToeCount;
          if(LibrarySystemScore != 0) LibrarySystemScore = LibrarySystemScore/LibrarySystemCount;
          if(RoshamboScore != 0) RoshamboScore = RoshamboScore/RoshamboCount;

          else;  

          let CourseScoreObj={
            'Algorithms and Flowcharts':{score:IntroductionScore},
            'Datatype andVariable':{score:StringScore},
            'Input and Output':{score:DatatypeScore},
            'Operators and Expressions':{score:OperatorsScore},
            'Selection Statements':{score:FlowControlScore},
            'Loop Statements':{score:PointersScore},
            'Arrays and Strings':{score:FunctionScore},
            'Functions':{score:StructureScore}
          }
          
          let sortedCourse = Object.keys(CourseScoreObj);
          sortedCourse.sort((a,b) => {
            //sort by score
            return CourseScoreObj[b].score - CourseScoreObj[a].score ;
          });

          let ProjectScoreObj={
            'Ticket Booking System':{score:TicTacToeScore},
            'Pointof Sales System':{score:LibrarySystemScore},
            'Project Quiz 3':{score:RoshamboScore}
          }
          let sortedProject = Object.keys(ProjectScoreObj);
          sortedProject.sort((a,b) => {
            //sort by score
            return ProjectScoreObj[b].score - ProjectScoreObj[a].score;
          });

          var BasicPercent =  Math.round(((BasicScore/(studentAll*10))*100));
          var TracePercent= Math.round(((TraceScore/(studentAll*20))*100))
          var ExplainPercent = Math.round(((ExplainScore/(studentAll*30))*100))
          var WritePercent = Math.round(((WriteScore/(studentAll*4))*100))

          BasicPercent = BasicPercent;
          TracePercent = TracePercent;
          ExplainPercent = ExplainPercent;
          WritePercent = WritePercent*10;

          var checksumper = BasicPercent+TracePercent+ExplainPercent+WritePercent
          console.log("\nCHECKSUM : " ,checksumper); //100

          res.render('index/index_teacher', { person ,sortedCourse,sortedProject,
            BasicPercent,TracePercent,ExplainPercent,WritePercent
          })

          });
        });
      }
            
    if(person.role === "Student"){

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var query = { email: person.email };
        dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
          if (err) throw err;
          if(Object.keys(StudentAnswer).length === 0){
            res.render('student/pretest', {person});
          }
          else{


            /** Update Data In class */
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db(mydatabase);
              var query = { email:person.email};
              dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
                if (err) throw err;

                var Posttest1Done = "ยังไม่ทำ" , Posttest2Done = "ยังไม่ทำ", Posttest3Done = "ยังไม่ทำ" ,Posttest4Done = "ยังไม่ทำ" ,Posttest5Done = "ยังไม่ทำ",Posttest6Done = "ยังไม่ทำ",Posttest7Done = "ยังไม่ทำ",Posttest8Done = "ยังไม่ทำ" ;
                var Pretest1Done = "ยังไม่ทำ" , Pretest2Done = "ยังไม่ทำ", Pretest3Done = "ยังไม่ทำ" ,Pretest4Done = "ยังไม่ทำ" ,Pretest5Done = "ยังไม่ทำ",Pretest6Done = "ยังไม่ทำ",Pretest7Done = "ยังไม่ทำ",Pretest8Done = "ยังไม่ทำ" ;
                var Ticket_Booking_SystemDone = "ยังไม่ทำ" , Point_of_Sales_SystemDone = "ยังไม่ทำ" , Project_QUIZ3Done = "ยังไม่ทำ";
                var StudentAnswerLV1 = "", StudentAnswerLV2 = "" , StudentAnswerLV3 = "", StudentAnswerLV4 = "รอตรวจ";
      
                for (let i = 0; i < Object.keys(StudentAnswer).length; i++) {

                  if(StudentAnswer[i].scoreLV1 >= 4){
                    StudentAnswerLV1 = "✓"
                  }
                  if(StudentAnswer[i].scoreLV2 >= 4){
                    StudentAnswerLV2 = "✓"
                  }
                  if(StudentAnswer[i].scoreLV3 >= 4){
                    StudentAnswerLV3 = "✓"
                  }
                  //** */
                  if(StudentAnswer[i].scoreLV1 === 0 &&  StudentAnswer[i].scoreLV1 != undefined){
                    StudentAnswerLV1 = "✗"
                  }
                  if(StudentAnswer[i].scoreLV2 === 0 &&  StudentAnswer[i].scoreLV2 != undefined){
                    StudentAnswerLV2 = "✗"
                  }
                  if(StudentAnswer[i].scoreLV3 === 0 &&  StudentAnswer[i].scoreLV3 != undefined){
                    StudentAnswerLV3 = "✗"
                  }
                  //** */
                  if(StudentAnswer[i].scoreTeacher != undefined){
                    StudentAnswerLV4 = StudentAnswer[i].scoreTeacher;
                  }
                

                  //** Pre-test */
                  if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)'){
                    Pretest1Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)'){
                    Pretest2Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)'){
                    Pretest3Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)'){
                    Pretest4Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)'){
                    Pretest5Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)'){
                    Pretest6Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)'){
                    Pretest7Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Functions-(Pre-test)'){
                    Pretest8Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  //** Post-test */
                  if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'){
                    Posttest1Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'){
                    Posttest2Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'){
                    Posttest3Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'){
                    Posttest4Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'){
                    Posttest5Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'){
                    Posttest6Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)'){
                    Posttest7Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Functions-(Post-test)'){
                    Posttest8Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  
                  //** Project-quiz */
                  if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)' && StudentAnswer[i].scoreTeacher != undefined) {   
                    Ticket_Booking_SystemDone = StudentAnswer[i].scoreTeacher
                  }
                  if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)'&& StudentAnswer[i].scoreTeacher != undefined) {   
                    Point_of_Sales_SystemDone = StudentAnswer[i].scoreTeacher 
                  }
                  if (StudentAnswer[i].contentName ==='Project_QUIZ3'&& StudentAnswer[i].scoreTeacher != undefined) {   
                    Project_QUIZ3Done = StudentAnswer[i].scoreTeacher
                  }
                }

                MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db(mydatabase);
                  var query = { email: person.email };
                  dbo.collection("StudentClass").find(query).toArray(function(err, StudentClass) {
                    if (err) throw err;
                      if(Object.keys(StudentClass).length > 0){
                        MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db(mydatabase);
                          var myquery = { email: person.email};
                          var newvalues = { $set: {
                            //Project quiz
                            TicketBookingSystem:Ticket_Booking_SystemDone,
                            PointofSalesSystem:Point_of_Sales_SystemDone,
                            Project_QUIZ3:Project_QUIZ3Done,
                            //Post test
                            Algorithms_and_Flowcharts:Posttest1Done,
                            Datatype_and_Variable:Posttest2Done,
                            Input_and_Output:Posttest3Done,
                            Operators_and_Expressions:Posttest4Done,
                            Selection_Statements:Posttest5Done,
                            Loop_Statements:Posttest6Done,
                            Arrays_and_Strings:Posttest7Done,
                            Functions:Posttest8Done,
                          } };
                          dbo.collection("StudentClass").updateOne(myquery, newvalues, function(err, res) {
                            if (err) throw err;
                            db.close();
                          });
                        });
                      }
                  })
                });
              });
            });/** Update Data In class */



            /** Chart */
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db(mydatabase);
              var query = { email:person.email };
              dbo.collection("StudentClass").find(query).toArray(function(err, result) {
                if (err) throw err;
                db.close();

                var IntroductionLV1=0,IntroductionLV2=0,IntroductionLV3=0,IntroductionLV4=0;
                var IntroductionScoreLV1=0,IntroductionScoreLV2=0,IntroductionScoreLV3=0,IntroductionScoreLV4=0;
                var StringLV1=0,StringLV2=0,StringLV3=0,StringLV4=0;
                var StringScoreLV1=0,StringScoreLV2=0,StringScoreLV3=0,StringScoreLV4=0;
                var DatatypeLV1=0,DatatypeLV2=0,DatatypeLV3=0,DatatypeLV4=0;
                var DatatypeScoreLV1=0,DatatypeScoreLV2=0,DatatypeScoreLV3=0,DatatypeScoreLV4=0;
                var OperatorsLV1=0,OperatorsLV2=0,OperatorsLV3=0,OperatorsLV4=0;
                var OperatorsScoreLV1=0,OperatorsScoreLV2=0,OperatorsScoreLV3=0,OperatorsScoreLV4=0;
                var FlowControlLV1=0,FlowControlLV2=0,FlowControlLV3=0,FlowControlLV4=0;
                var FlowControlScoreLV1=0,FlowControlScoreLV2=0,FlowControlScoreLV3=0,FlowControlScoreLV4=0;
                var PointersLV1=0,PointersLV2=0,PointersLV3=0,PointersLV4=0;
                var PointersScoreLV1=0,PointersScoreLV2=0,PointersScoreLV3=0,PointersScoreLV4=0;
                var FunctionLV1=0,FunctionLV2=0,FunctionLV3=0,FunctionLV4=0;
                var FunctionScoreLV1=0,FunctionScoreLV2=0,FunctionScoreLV3=0,FunctionScoreLV4=0;
                var StructureLV1=0,StructureLV2=0,StructureLV3=0,StructureLV4=0;
                var StructureScoreLV1=0,StructureScoreLV2=0,StructureScoreLV3=0,StructureScoreLV4=0;
                var Ticket_Booking_SystemDone = "ยังไม่ทำ" , Point_of_Sales_SystemDone = "ยังไม่ทำ" , Project_QUIZ3Done = "ยังไม่ทำ";
                var Posttest1Done = 0 ,Posttest2Done = 0 ,Posttest3Done = 0,Posttest4Done = 0 ,Posttest5Done = 0,Posttest6Done = 0,Posttest7Done = 0,Posttest8Done = 0;
        
        
                for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {
                  if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)') {   
                      IntroductionLV1 = StudentAnswer[i].scoreLV1;
                      IntroductionLV2 = StudentAnswer[i].scoreLV2;
                      IntroductionLV3 = StudentAnswer[i].scoreLV3;
                      IntroductionLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest1Done = 1;
                  }      
                  if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)') {   
                      StringLV1 = StudentAnswer[i].scoreLV1;
                      StringLV2 = StudentAnswer[i].scoreLV2;
                      StringLV3 = StudentAnswer[i].scoreLV3;
                      StringLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest2Done = 1;
                  } 
                  if (StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)') {   
                      DatatypeLV1 = StudentAnswer[i].scoreLV1;
                      DatatypeLV2 = StudentAnswer[i].scoreLV2;
                      DatatypeLV3 = StudentAnswer[i].scoreLV3;
                      DatatypeLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest3Done = 1;
                  } 
                  if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)') {   
                      OperatorsLV1 = StudentAnswer[i].scoreLV1;
                      OperatorsLV2 = StudentAnswer[i].scoreLV2;
                      OperatorsLV3 = StudentAnswer[i].scoreLV3;
                      OperatorsLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest4Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)') {   
                      FlowControlLV1 = StudentAnswer[i].scoreLV1;
                      FlowControlLV2 = StudentAnswer[i].scoreLV2;
                      FlowControlLV3 = StudentAnswer[i].scoreLV3;
                      FlowControlLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest5Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)') {   
                      PointersLV1 = StudentAnswer[i].scoreLV1;
                      PointersLV2 = StudentAnswer[i].scoreLV2;
                      PointersLV3 = StudentAnswer[i].scoreLV3;
                      PointersLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest6Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)') {   
                      FunctionLV1 = StudentAnswer[i].scoreLV1;
                      FunctionLV2 = StudentAnswer[i].scoreLV2;
                      FunctionLV3 = StudentAnswer[i].scoreLV3;
                      FunctionLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest7Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Functions-(Pre-test)') {   
                      StructureLV1 = StudentAnswer[i].scoreLV1;
                      StructureLV2 = StudentAnswer[i].scoreLV2;
                      StructureLV3 = StudentAnswer[i].scoreLV3;
                      StructureLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      Pretest8Done = 1;
                  }
                /** Post-test */
                    if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)') {   
                        IntroductionScoreLV1 = StudentAnswer[i].scoreLV1;
                        IntroductionScoreLV2 = StudentAnswer[i].scoreLV2;
                        IntroductionScoreLV3 = StudentAnswer[i].scoreLV3;
                        IntroductionScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest1Done = 1;
                    }      
                    if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)') {   
                        StringScoreLV1 = StudentAnswer[i].scoreLV1;
                        StringScoreLV2 = StudentAnswer[i].scoreLV2;
                        StringScoreLV3 = StudentAnswer[i].scoreLV3;
                        StringScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest2Done = 1;
                    } 
                    if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)') {   
                        DatatypeScoreLV1 = StudentAnswer[i].scoreLV1;
                        DatatypeScoreLV2 = StudentAnswer[i].scoreLV2;
                        DatatypeScoreLV3 = StudentAnswer[i].scoreLV3;
                        DatatypeScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest3Done = 1;
                    } 
                    if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)') {   
                        OperatorsScoreLV1 = StudentAnswer[i].scoreLV1;
                        OperatorsScoreLV2 = StudentAnswer[i].scoreLV2;
                        OperatorsScoreLV3 = StudentAnswer[i].scoreLV3;
                        OperatorsScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest4Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)') {   
                        FlowControlScoreLV1 = StudentAnswer[i].scoreLV1;
                        FlowControlScoreLV2 = StudentAnswer[i].scoreLV2;
                        FlowControlScoreLV3 = StudentAnswer[i].scoreLV3;
                        FlowControlScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest5Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)') {   
                        PointersScoreLV1 = StudentAnswer[i].scoreLV1;
                        PointersScoreLV2 = StudentAnswer[i].scoreLV2;
                        PointersScoreLV3 = StudentAnswer[i].scoreLV3;
                        PointersScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest6Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)') {   
                        FunctionScoreLV1 = StudentAnswer[i].scoreLV1;
                        FunctionScoreLV2 = StudentAnswer[i].scoreLV2;
                        FunctionScoreLV3 = StudentAnswer[i].scoreLV3;
                        FunctionScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest7Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Functions-(Post-test)') {   
                        StructureScoreLV1 = StudentAnswer[i].scoreLV1;
                        StructureScoreLV2 = StudentAnswer[i].scoreLV2;
                        StructureScoreLV3 = StudentAnswer[i].scoreLV3;
                        StructureScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        Posttest8Done = 1;
                    }
                    //** **//
                    var PrjQuiz1Score = "ยังไม่ได้ทำ", PrjQuiz2Score = "ยังไม่ได้ทำ", PrjQuiz3Score = "ยังไม่ได้ทำ" 
                    if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)') {   
                      Ticket_Booking_SystemDone = 1;
                        if (StudentAnswer[i].scoreTeacher === undefined) {
                          PrjQuiz1Score = "รอตรวจ"
                        } else {PrjQuiz1Score = parseInt(StudentAnswer[i].scoreTeacher) + "/25 คะแนน";}
                    }
                    if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)') {   
                        Point_of_Sales_SystemDone = 1;
                        if (StudentAnswer[i].scoreTeacher === undefined) {
                          PrjQuiz2Score = "รอตรวจ"
                        } else {PrjQuiz2Score = parseInt(StudentAnswer[i].scoreTeacher) + "/25 คะแนน";}
                    }
                    if (StudentAnswer[i].contentName ==='Project_QUIZ3') {   
                        Project_QUIZ3Done = 1;
                        if (StudentAnswer[i].scoreTeacher === undefined) {
                          PrjQuiz3Score = "รอตรวจ"
                        } else {PrjQuiz3Score = parseInt(StudentAnswer[i].scoreTeacher) + "/25 คะแนน";}
                    }
                  }

                /*** SUM */

                //*** Chart Pretest score */
                var PreBasicScore = IntroductionLV1+StringLV1+DatatypeLV1+OperatorsLV1+FlowControlLV1+PointersLV1+FunctionLV1+StructureLV1 ;
                var PreTraceScore = IntroductionLV2+StringLV2+DatatypeLV2+OperatorsLV2+FlowControlLV2+PointersLV2+FunctionLV2+StructureLV2 ;
                var PreExplainScore = IntroductionLV3+StringLV3+DatatypeLV3+OperatorsLV3+FlowControlLV3+PointersLV3+FunctionLV3+StructureLV3 ;
                var PreWriteScore = IntroductionLV4+StringLV4+DatatypeLV4+OperatorsLV4+FlowControlLV4+PointersLV4+FunctionLV4+StructureLV4 ;

                var PreBasicPercent =  Math.round(PreBasicScore);
                var PreTracePercent= Math.round(PreTraceScore);
                var PreExplainPercent = Math.round(PreExplainScore);
                var PreWritePercent = Math.round(PreWriteScore/5);
                PreBasicPercent = PreBasicPercent;
                PreTracePercent = PreTracePercent;
                PreExplainPercent = PreExplainPercent;
                PreWritePercent = PreWritePercent;

                //*** Chart Posttest score */
                var BasicScore = IntroductionScoreLV1+StringScoreLV1+DatatypeScoreLV1+OperatorsScoreLV1+FlowControlScoreLV1+PointersScoreLV1+FunctionScoreLV1+StructureScoreLV1 ;
                var TraceScore = IntroductionScoreLV2+StringScoreLV2+DatatypeScoreLV2+OperatorsScoreLV2+FlowControlScoreLV2+PointersScoreLV2+FunctionScoreLV2+StructureScoreLV2 ;
                var ExplainScore = IntroductionScoreLV3+StringScoreLV3+DatatypeScoreLV3+OperatorsScoreLV3+FlowControlScoreLV3+PointersScoreLV3+FunctionScoreLV3+StructureScoreLV3 ;
                var WriteScore = IntroductionScoreLV4+StringScoreLV4+DatatypeScoreLV4+OperatorsScoreLV4+FlowControlScoreLV4+PointersScoreLV4+FunctionScoreLV4+StructureScoreLV4 ;
                // var CourseDone = Posttest1Done+StringDone+DatatypeDone+OperatorsDone+FlowControlDone+PointersDone+FunctionDone+StructureDone+InputOutputDone;
                
                var BasicPercent =  Math.round(BasicScore);
                var TracePercent= Math.round(TraceScore);
                var ExplainPercent = Math.round(ExplainScore);
                var WritePercent = Math.round(WriteScore/5);
                BasicPercent = BasicPercent;
                TracePercent = TracePercent;
                ExplainPercent = ExplainPercent;
                WritePercent = WritePercent;
                
                //** Project Quiz Score */
                PrjQuiz1 = PrjQuiz1Score;
                PrjQuiz2 = PrjQuiz2Score;
                PrjQuiz3 = PrjQuiz3Score;
                
                //////********RECOMMENDATION*********** */

                MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db(mydatabase);
                  var query = {email:person.email};
                  dbo.collection("StudentRecommendation").find(query).toArray(function(err, RecommendaResult) {
                    if (err) throw err;

                    //หาคอร์สที่เรียนไป แล้วกรองไม้ให้ซ้ำกัน
                    var ArrCourseDone = [];
                    for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {        //value คือ ความยาก ง่าย - 1 ยาก - 8
                      var LV1 = StudentAnswer[i].scoreLV1 , LV2 = StudentAnswer[i].scoreLV2 , LV3 = StudentAnswer[i].scoreLV3;
                      if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'   && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Algorithms and Flowcharts",value:1});} 
                      if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'       && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Datatype and Variable",value:2});}
                      if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'            && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Input and Output",value:3});} 
                      if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'   && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Operators and Expressions",value:4});}
                      if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'        && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Selection Statements",value:5});}
                      if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'             && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Loop Statements",value:6});}
                      if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)'          && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Arrays and Strings",value:7});}
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
                          else if(RecommendaResult[0].RecommendationType === "TicketBookingSystem-(Project_quiz1)"  ){ RecommendOutput = DiffTicketBookingSystem }
                          else if(RecommendaResult[0].RecommendationType === "PointofSalesSystem-(Project_quiz2)"    ){ RecommendOutput = DiffPointofSalesSystem    }
                          else if(RecommendaResult[0].RecommendationType === "ProjectQUIZ3"   ){ RecommendOutput = DiffProjectQUIZ3}
                          if(Object.keys(RecommendOutput).length === 0){  RecommendOutput = "โปรดเลือกการแนะนำ" } //ถ้า คอร์ส ใน path หมดแล้ว
                          else{RecommendOutput = RecommendOutput[0]}    //เลือกตัวแรกของ array = ตัวที่ง่ายที่สุด
                        
                      }
                      else {RecommendOutput = "สิ้นสุดการแนะนำ"} //ไม่เหลือ node (คอร์ส หรือ บทเรียน) ให้แนะนำ
                      
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


                    


                    res.render('index/index_student', { person ,result,RecommendaResult,StudentAnswer,
                      PrjQuiz1,PrjQuiz2,PrjQuiz3,
                      BasicPercent,TracePercent,ExplainPercent,WritePercent,
                      PreBasicPercent,PreTracePercent,PreExplainPercent,PreWritePercent,
                      TicketBooking_SystemPercent,PointofSales_SystemPercent,ProjectQUIZ3Percent
                    });
                  });
                });



              });
            });
          }
          
          db.close();
        });
      });

      
    }
  }
  else res.render('index/index_viewer');
});

router.post('/joinclass', async (req, res, next) => {
  try {
    const person = req.user;
    const classToken = req.body.classToken;
    if(person.role === "Student"){
      
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(mydatabase);
          var query = { token: classToken };
          dbo.collection("TeacherClass").find(query).toArray(function(err, classesResult) {
            if (err) throw err;

            if(Object.keys(classesResult).length != ''){

              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(mydatabase);
                var query = { email: person.email };
                dbo.collection("StudentClass").find(query).toArray(function(err, result) {
                  if (err) throw err;

                  if(Object.keys(result).length === 0){

                    MongoClient.connect(url, function(err, db) {
                      if (err) throw err;
                      var dbo = db.db(mydatabase);
                      var query = { email:person.email};
                      dbo.collection("StudentAnswer").find(query).toArray(function(err, StudentAnswer) {
                        if (err) throw err;
        
                        var Posttest1Done = " - " ,Posttest2Done = " - ",Posttest3Done = " - " ,Posttest4Done = " - " ,Posttest5Done = " - ",Posttest6Done = " - ",Posttest7Done = " - ",Posttest8Done = " - ";
                        var Ticket_Booking_SystemDone = " - " , Point_of_Sales_SystemDone = " - " , Project_QUIZ3Done = " - ";
              
                        for (let i = 0; i < Object.keys(StudentAnswer).length; i++) {
        
                        if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'){
                          Posttest1Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'){
                          Posttest2Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'){
                          Posttest3Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'){
                          Posttest4Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'){
                          Posttest5Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'){
                          Posttest6Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)'){
                          Posttest7Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Functions-(Post-test)'){
                          Posttest8Done = "YES";
                        }

                        /** */
                        if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)') {   
                          Ticket_Booking_SystemDone = "YES";
                        }
                        if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)') {   
                          Point_of_Sales_SystemDone = "YES";
                        }
                        if (StudentAnswer[i].contentName ==='Project_QUIZ3') {   
                          Project_QUIZ3Done = "YES";
                        }

        
                        }
                        
                        MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db(mydatabase);
                          
                          var myobj = {
                            times: new Date().toLocaleString(), 
                            email: person.email,
                            name: person.name,
                            Course:classesResult[0].course,
                            Section:classesResult[0].section,
                            token: classesResult[0].token ,
                            teacher:classesResult[0].email,
                            //Project Quiz
                            TicketBookingSystem:Ticket_Booking_SystemDone,
                            PointofSalesSystem:Point_of_Sales_SystemDone,
                            Project_QUIZ3:Project_QUIZ3Done,
                            //Pre-Post test
                            Algorithms_and_Flowcharts:Posttest1Done,
                            Datatype_and_Variable:Posttest2Done,
                            Input_and_Output:Posttest3Done,
                            Operators_and_Expressions:Posttest4Done,
                            Selection_Statements:Posttest5Done,
                            Loop_Statements:Posttest6Done,
                            Arrays_and_Strings:Posttest7Done,
                            Functions:Posttest8Done,
                            
                          };
                          dbo.collection("StudentClass").insertOne(myobj, function(err, res) {
                            if (err) throw err;
                            db.close();
                          });
                        });
                      });
                    });
                  }

                  else{
                    MongoClient.connect(url, function(err, db) {
                      if (err) throw err;
                      var dbo = db.db(mydatabase);
                      var myquery = { email: person.email };
                      var newvalues = { $set: {ClassName : classesResult[0].name} };
                      dbo.collection("StudentClass").updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        db.close();
                      });
                    });
                  }
                  db.close();
                });
              });
            }
            else{}

            db.close();
          });
        });
      res.redirect('back');
    }
    
    
  } catch (error) {
    next(error);
  }
});

router.post('/Recommendation_setting', async (req, res, next) => {
  try {
    const person = req.user;
    const Recommendation = req.body.RecommendationSetting;

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mydatabase);
      var query = { email:person.email };
      dbo.collection("StudentRecommendation").find(query).toArray(function(err, StudentRecommendationQuery) {
        if (err) throw err;        
        
        if(Object.keys(StudentRecommendationQuery).length === 0 ){
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mydatabase);
            var myobj = { times: new Date().toLocaleString(), 
                          email: person.email,
                          RecommendationType: Recommendation,
                          RecommendCourse:"null"
                        };
            dbo.collection("StudentRecommendation").insertOne(myobj, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        else{
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mydatabase);
            var myquery = { email:person.email};
            var newvalues = { $set: 
              {
                RecommendationType: Recommendation
              } 
            };
            dbo.collection("StudentRecommendation").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }


      });
    });

    
  
    res.redirect('back')
  } catch (error) {
    next(error);
  }
});


module.exports = router;
