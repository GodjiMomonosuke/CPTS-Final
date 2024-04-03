const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:1234@cluster0.ormtjkb.mongodb.net";



const mydatabase = "Cluster0";

router.post('/pretestSubmit', async (req, res, next) => {
  const person = req.user;
  var currentQuiz = "Ready"

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mydatabase);
    var myobj = { 
      timetodo:1,
      times: new Date().toLocaleString(), 
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
          var CalculatorScore=0,CalculatorCount=0;
          var CalendarScore=0,CalendarCount=0;

          
          for(let i = 0; i < studentAll; i++) {

            if( StudentAnswer[i].contentName ==='Introduction-Quiz' ){
              if(StudentAnswer[i].scoreTeacher === undefined){
                IntroductionScore = IntroductionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;
              }
              else{
                IntroductionScore = IntroductionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);
              }
              IntroductionCount++;
            }
            if (StudentAnswer[i].contentName ==='String-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                StringScore =StringScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                StringScore =StringScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
              StringCount++;
            }
            if (StudentAnswer[i].contentName ==='Datatype-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                DatatypeScore =DatatypeScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                DatatypeScore =DatatypeScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                DatatypeCount++;
            } 
            if (StudentAnswer[i].contentName ==='Operators-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                OperatorsScore =OperatorsScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                OperatorsScore =OperatorsScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                OperatorsCount++;
            }
            if (StudentAnswer[i].contentName ==='FlowControl-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                FlowControlScore =FlowControlScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                FlowControlScore =FlowControlScore+ StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                FlowControlCount++;
            }
            if (StudentAnswer[i].contentName ==='Pointers-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                PointersScore = PointersScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                PointersScore = PointersScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                PointersCount++;
            }
            if (StudentAnswer[i].contentName ==='Function-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                FunctionScore = FunctionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                FunctionScore = FunctionScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                FunctionCount++;
            }
            if (StudentAnswer[i].contentName ==='Structure-Quiz') {   
                if(StudentAnswer[i].scoreTeacher === undefined){
                  StructureScore = StructureScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
                else{
                  StructureScore = StructureScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                  StructureCount++;
            }
            if (StudentAnswer[i].contentName ==='Array-Quiz') {   
              if(StudentAnswer[i].scoreTeacher === undefined){
                ArrayScore = ArrayScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3;}
              else{
                ArrayScore = ArrayScore+StudentAnswer[i].scoreLV1+StudentAnswer[i].scoreLV2+StudentAnswer[i].scoreLV3+parseInt(StudentAnswer[i].scoreTeacher);}
                ArrayCount++;
            }
            /** */

            if (StudentAnswer[i].contentName ==='TicTacToe') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                TicTacToeScore = TicTacToeScore+parseInt(StudentAnswer[i].scoreTeacher);}
                TicTacToeCount++;
            }
            if (StudentAnswer[i].contentName ==='LibrarySystem') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                LibrarySystemScore = LibrarySystemScore+parseInt(StudentAnswer[i].scoreTeacher);}
                LibrarySystemCount++;
            }
            if (StudentAnswer[i].contentName ==='Roshambo') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                RoshamboScore = RoshamboScore+parseInt(StudentAnswer[i].scoreTeacher);}
                RoshamboCount++;
            }
            if (StudentAnswer[i].contentName ==='Calculator') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                CalculatorScore = CalculatorScore+parseInt(StudentAnswer[i].scoreTeacher);}
                CalculatorCount++;
            }
            if (StudentAnswer[i].contentName ==='Calendar') {   
              if(StudentAnswer[i].scoreTeacher === undefined){}
              else{
                CalendarScore = CalendarScore+parseInt(StudentAnswer[i].scoreTeacher);}
                CalendarCount++;
            }
           

            if( StudentAnswer[i].contentName ==='Introduction-Quiz' ||
                StudentAnswer[i].contentName ==='Datatype-Quiz' || 
                StudentAnswer[i].contentName ==='String-Quiz' ||
                StudentAnswer[i].contentName ==='Operators-Quiz' ||
                StudentAnswer[i].contentName ==='FlowControl-Quiz' ||
                StudentAnswer[i].contentName ==='Pointers-Quiz' ||
                StudentAnswer[i].contentName ==='Function-Quiz' ||
                StudentAnswer[i].contentName ==='Structure-Quiz' ||
                StudentAnswer[i].contentName ==='Array-Quiz' 
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
          if(ArrayScore != 0)ArrayScore = ArrayScore/ArrayCount;

          if(TicTacToeScore != 0) TicTacToeScore = TicTacToeScore/TicTacToeCount;
          if(LibrarySystemScore != 0) LibrarySystemScore = LibrarySystemScore/LibrarySystemCount;
          if(RoshamboScore != 0) RoshamboScore = RoshamboScore/RoshamboCount;
          if(CalculatorScore != 0) CalculatorScore = CalculatorScore/CalculatorCount;
          if(CalendarScore != 0) CalendarScore = CalendarScore/CalendarCount;

          else;  

          let CourseScoreObj={
            'Introduction':{score:IntroductionScore},
            'String':{score:StringScore},
            'Datatype':{score:DatatypeScore},
            'Operators':{score:OperatorsScore},
            'Selection':{score:FlowControlScore},
            'Loop':{score:FlowControlScore},
            'Pointers':{score:PointersScore},
            'Function':{score:FunctionScore},
            'Structure':{score:StructureScore},
            'Array':{score:ArrayScore}
          }
          
          let sortedCourse = Object.keys(CourseScoreObj);
          sortedCourse.sort((a,b) => {
            //sort by score
            return CourseScoreObj[b].score - CourseScoreObj[a].score ;
          });

          let ProjectScoreObj={
            'TicTacToe':{score:TicTacToeScore},
            'Library System':{score:LibrarySystemScore},
            'Roshambo':{score:RoshamboScore},
            'Calculator':{score:CalculatorScore},
            'Calendar':{score:CalendarScore}
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
          if(Object.keys(StudentAnswer).length < 0){
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

                var IntroductionDone = "ยังไม่ทำ" ,StringDone = "ยังไม่ทำ" ,OperatorsDone = "ยังไม่ทำ" ,DatatypeDone = "ยังไม่ทำ",FlowControlDone = "ยังไม่ทำ",LoopDone = "ยังไม่ทำ",PointersDone = "ยังไม่ทำ",FunctionDone = "ยังไม่ทำ",StructureDone = "ยังไม่ทำ",ArrayDone = "ยังไม่ทำ" ,InputOutputDone = "ยังไม่ทำ" ;
                var Ticket_Booking_SystemDone = "ยังไม่ทำ" , Point_of_Sales_SystemDone = "ยังไม่ทำ" , Project_QUIZ3Done = "ยังไม่ทำ" ,CalendarDone = "ยังไม่ทำ" , CalculatorDone = "ยังไม่ทำ";
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
                
                  //** Algorithms_and_Flowcharts */
                  if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'){
                    IntroductionDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  //** Datatype_and_Variable */
                  if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'){
                    DatatypeDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  //** Input_and_Output */
                  if(StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'){
                    StringDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'){
                    OperatorsDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'){
                    FlowControlDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'){
                    LoopDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Pointers-Quiz'){
                    PointersDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Function-Quiz'){
                    FunctionDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Structure-Quiz'){
                    StructureDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='Array-Quiz'){
                    ArrayDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  if(StudentAnswer[i].contentName ==='InputOutput-Quiz'){
                    InputOutputDone = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4;
                  }
                  
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
                            //Pre-Post test
                            Introduction:IntroductionDone,
                            String:StringDone,
                            Datatype:DatatypeDone,
                            Operators:OperatorsDone,
                            FlowControl:FlowControlDone,
                            Loop:LoopDone,
                            Pointers:PointersDone,
                            Function:FunctionDone,
                            Structure:StructureDone,
                            Array:ArrayDone,
                            InputOutput:InputOutputDone
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


                var IntroductionScoreLV1=0,IntroductionScoreLV2=0,IntroductionScoreLV3=0,IntroductionScoreLV4=0;
                var StringScoreLV1=0,StringScoreLV2=0,StringScoreLV3=0,StringScoreLV4=0;
                var DatatypeScoreLV1=0,DatatypeScoreLV2=0,DatatypeScoreLV3=0,DatatypeScoreLV4=0;
                var OperatorsScoreLV1=0,OperatorsScoreLV2=0,OperatorsScoreLV3=0,OperatorsScoreLV4=0;
                var FlowControlScoreLV1=0,FlowControlScoreLV2=0,FlowControlScoreLV3=0,FlowControlScoreLV4=0;
                var PointersScoreLV1=0,PointersScoreLV2=0,PointersScoreLV3=0,PointersScoreLV4=0;
                var FunctionScoreLV1=0,FunctionScoreLV2=0,FunctionScoreLV3=0,FunctionScoreLV4=0;
                var StructureScoreLV1=0,StructureScoreLV2=0,StructureScoreLV3=0,StructureScoreLV4=0;
                var ArrayLV1=0,ArrayLV2=0,ArrayLV3=0,ArrayLV4=0;
                var InputOutputLV1=0,InputOutputLV2=0,InputOutputLV3=0,InputOutputLV4=0;
                var IntroductionDone = 0 ,StringDone = 0 ,OperatorsDone = 0 ,DatatypeDone = 0,FlowControlDone = 0,PointersDone = 0,FunctionDone = 0,StructureDone = 0,ArrayDone = 0 ,InputOutputDone = 0;
        
        
                for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {
                    if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)') {   
                        IntroductionScoreLV1 = StudentAnswer[i].scoreLV1;
                        IntroductionScoreLV2 = StudentAnswer[i].scoreLV2;
                        IntroductionScoreLV3 = StudentAnswer[i].scoreLV3;
                        IntroductionScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        IntroductionDone = 1;
                    }      
                    if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)') {   
                        StringScoreLV1 = StudentAnswer[i].scoreLV1;
                        StringScoreLV2 = StudentAnswer[i].scoreLV2;
                        StringScoreLV3 = StudentAnswer[i].scoreLV3;
                        StringScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        StringDone = 1;
                    } 
                    if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)') {   
                        DatatypeScoreLV1 = StudentAnswer[i].scoreLV1;
                        DatatypeScoreLV2 = StudentAnswer[i].scoreLV2;
                        DatatypeScoreLV3 = StudentAnswer[i].scoreLV3;
                        DatatypeScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        DatatypeDone = 1;
                    } 
                    if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)') {   
                        OperatorsScoreLV1 = StudentAnswer[i].scoreLV1;
                        OperatorsScoreLV2 = StudentAnswer[i].scoreLV2;
                        OperatorsScoreLV3 = StudentAnswer[i].scoreLV3;
                        OperatorsScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        OperatorsDone = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)') {   
                        FlowControlScoreLV1 = StudentAnswer[i].scoreLV1;
                        FlowControlScoreLV2 = StudentAnswer[i].scoreLV2;
                        FlowControlScoreLV3 = StudentAnswer[i].scoreLV3;
                        FlowControlScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        FlowControlDone = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)') {   
                        PointersScoreLV1 = StudentAnswer[i].scoreLV1;
                        PointersScoreLV2 = StudentAnswer[i].scoreLV2;
                        PointersScoreLV3 = StudentAnswer[i].scoreLV3;
                        PointersScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        PointersDone = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)') {   
                        FunctionScoreLV1 = StudentAnswer[i].scoreLV1;
                        FunctionScoreLV2 = StudentAnswer[i].scoreLV2;
                        FunctionScoreLV3 = StudentAnswer[i].scoreLV3;
                        FunctionScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        FunctionDone = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Functions-(Post-test)') {   
                        StructureScoreLV1 = StudentAnswer[i].scoreLV1;
                        StructureScoreLV2 = StudentAnswer[i].scoreLV2;
                        StructureScoreLV3 = StudentAnswer[i].scoreLV3;
                        StructureScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        StructureDone = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Array-Quiz') {   
                        ArrayLV1 = StudentAnswer[i].scoreLV1;
                        ArrayLV2 = StudentAnswer[i].scoreLV2;
                        ArrayLV3 = StudentAnswer[i].scoreLV3;
                        ArrayLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        ArrayDone = 1;
                    }
                    if (StudentAnswer[i].contentName ==='InputOutput-Quiz') {   
                        InputOutputLV1 = StudentAnswer[i].scoreLV1;
                        InputOutputLV2 = StudentAnswer[i].scoreLV2;
                        InputOutputLV3 = StudentAnswer[i].scoreLV3;
                        InputOutputLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        InputOutputDone = 1;
                  }
                }

                /*** SUM */

                //*** Chart Posttest score */
                var BasicScore = IntroductionScoreLV1+StringScoreLV1+DatatypeScoreLV1+OperatorsScoreLV1+FlowControlScoreLV1+PointersScoreLV1+FunctionScoreLV1+StructureScoreLV1+ArrayLV1+InputOutputLV1 ;
                var TraceScore = IntroductionScoreLV2+StringScoreLV2+DatatypeScoreLV2+OperatorsScoreLV2+FlowControlScoreLV2+PointersScoreLV2+FunctionScoreLV2+StructureScoreLV2+ArrayLV2+InputOutputLV2 ;
                var ExplainScore = IntroductionScoreLV3+StringScoreLV3+DatatypeScoreLV3+OperatorsScoreLV3+FlowControlScoreLV3+PointersScoreLV3+FunctionScoreLV3+StructureScoreLV3+ArrayLV3+InputOutputLV3 ;
                var WriteScore = IntroductionScoreLV4+StringScoreLV4+DatatypeScoreLV4+OperatorsScoreLV4+FlowControlScoreLV4+PointersScoreLV4+FunctionScoreLV4+StructureScoreLV4+ArrayLV4+InputOutputLV4 ;
                //var CourseDone = IntroductionDone+StringDone+DatatypeDone+OperatorsDone+FlowControlDone+PointersDone+FunctionDone+StructureDone+ArrayDone+InputOutputDone;
                
                var BasicPercent =  Math.round((BasicScore*5));
                var TracePercent= Math.round((TraceScore*5));
                var ExplainPercent = Math.round((ExplainScore*5));
                var WritePercent = Math.round(WriteScore);
                BasicPercent = BasicPercent;
                TracePercent = TracePercent;
                ExplainPercent = ExplainPercent;
                WritePercent = WritePercent;
                
                
                
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
                      if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'   && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) { ArrCourseDone.push({key:"Operators and Expressions",value:4});}
                      if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'         && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Selection Statements",value:5});}
                      if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'              && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Loop Statements",value:6});}
                      if (StudentAnswer[i].contentName ==='Arrays_and_String-(Post-test)'            && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Arrays and Strings",value:7});}
                      if (StudentAnswer[i].contentName ==='Functions-(Post-test)'                    && LV1 >= 4 && LV2 >= 4 && LV3 >= 4) {ArrCourseDone.push({key:"Functions",value:8});}
                      
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
                      BasicPercent,TracePercent,ExplainPercent,WritePercent,
                      TicketBooking_SystemPercent,PointofSales_SystemPercent,ProjectQUIZ3Percent,
                      IntroductionScoreLV1,IntroductionScoreLV2,IntroductionScoreLV3,IntroductionScoreLV4,
                      StringScoreLV1,StringScoreLV2,StringScoreLV3,StringScoreLV4,
                      DatatypeScoreLV1,DatatypeScoreLV2,DatatypeScoreLV3,DatatypeScoreLV4,
                      OperatorsScoreLV1,OperatorsScoreLV2,OperatorsScoreLV3,OperatorsScoreLV4,
                      FlowControlScoreLV1,FlowControlScoreLV2,FlowControlScoreLV3,FlowControlScoreLV4,
                      PointersScoreLV1,PointersScoreLV2,PointersScoreLV3,PointersScoreLV4,
                      FunctionScoreLV1,FunctionScoreLV2,FunctionScoreLV3,FunctionScoreLV4,
                      StructureScoreLV1,StructureScoreLV2,StructureScoreLV3,StructureScoreLV4
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
        
                        var IntroductionDone = " - " ,StringDone = " - " ,OperatorsDone = " - " ,DatatypeDone = " - ",FlowControlDone = " - ",PointersDone = " - ",FunctionDone = " - ",StructureDone = " - ",ArrayDone = " - ";
                        var Ticket_Booking_SystemDone = " - " , Point_of_Sales_SystemDone = " - " , Project_QUIZ3Done = " - " ,CalendarDone = " - " , CalculatorDone = " - ";
              
                        for (let i = 0; i < Object.keys(StudentAnswer).length; i++) {
        
                        if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'){
                          IntroductionDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'){
                          DatatypeDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'){
                          StringDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'){
                          OperatorsDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'){
                          FlowControlDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'){
                          PointersDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)'){
                          FunctionDone = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Functions-(Post-test)'){
                          StructureDone = "YES";
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
                            ClassName:classesResult[0].name,
                            token: classesResult[0].token ,
                            teacher:classesResult[0].email,
                            //Project Quiz
                            Ticket_Booking_System:Ticket_Booking_SystemDone,
                            Point_of_Sales_System:Point_of_Sales_SystemDone,
                            Project_QUIZ3:ProjectQUIZ3Done,
                            //Pre-Post test
                            Introduction:IntroductionDone,
                            String:StringDone,
                            Datatype:DatatypeDone,
                            Operators:OperatorsDone,
                            FlowControl:FlowControlDone,
                            Pointers:PointersDone,
                            Function:FunctionDone,
                            Structure:StructureDone,
                            Array:ArrayDone
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
