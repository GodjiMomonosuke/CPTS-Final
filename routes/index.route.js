const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";



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

          var PreKnowledgeScore =0;
          var PreTraceScore =0;
          var PreExplainScore =0;
          var PreWriteScore =0;
          var KnowledgeScore =0;
          var TraceScore =0;
          var ExplainScore =0;
          var WriteScore =0;
          var studentAll = Object.keys(StudentAnswer).length
          
          var IntroductionScore=0,IntroductionCount=0,PreIntroductionScore=0,PreIntroductionCount=0,PreIntroduction=0,Introduction=0,
          PreIntroductionLv1=0,PreIntroductionLv2=0,PreIntroductionLv3=0,PreIntroductionLv4=0,IntroductionLv1=0,IntroductionLv2=0,IntroductionLv3=0,IntroductionLv4=0,
          NumbeOfPretest1=0,NumbeOfTest1=0;

          var StringScore=0,StringCount=0,PreStringScore=0,PreStringCount=0,PreString=0,String=0,
          PreStringLv1=0,PreStringLv2=0,PreStringLv3=0,PreStringLv4=0,StringLv1=0,StringLv2=0,StringLv3=0,StringLv4=0,
          NumbeOfPretest2=0,NumbeOfTest2=0;

          var DatatypeScore=0,DatatypeCount=0,PreDatatypeScore=0,PreDatatypeCount=0,PreDatatype=0,Datatype=0,
          PreDatatypeLv1=0,PreDatatypeLv2=0,PreDatatypeLv3=0,PreDatatypeLv4=0,DatatypeLv1=0,DatatypeLv2=0,DatatypeLv3=0,DatatypeLv4=0,
          NumbeOfPretest3=0,NumbeOfTest3=0;

          var OperatorsScore=0,OperatorsCount=0,PreOperatorsScore=0,PreOperatorsCount=0,PreOperators=0,Operators=0,
          PreOperatorsLv1=0,PreOperatorsLv2=0,PreOperatorsLv3=0,PreOperatorsLv4=0,OperatorsLv1=0,OperatorsLv2=0,OperatorsLv3=0,OperatorsLv4=0,
          NumbeOfPretest4=0,NumbeOfTest4=0;

          var FlowControlScore=0,FlowControlCount=0,PreFlowControlScore=0,PreFlowControlCount=0,PreFlowControl=0,FlowControl=0,
          PreFlowControlLv1=0,PreFlowControlLv2=0,PreFlowControlLv3=0,PreFlowControlLv4=0,FlowControlLv1=0,FlowControlLv2=0,FlowControlLv3=0,FlowControlLv4=0,
          NumbeOfPretest5=0,NumbeOfTest5=0;

          var PointersScore=0,PointersCount=0,PrePointersScore=0,PrePointersCount=0,PrePointers=0,Pointers=0,
          PrePointersLv1=0,PrePointersLv2=0,PrePointersLv3=0,PrePointersLv4=0,PointersLv1=0,PointersLv2=0,PointersLv3=0,PointersLv4=0,
          NumbeOfPretest6=0,NumbeOfTest6=0;

          var FunctionScore=0,FunctionCount=0,PreFunctionScore=0,PreFunctionCount=0,PreFunction=0,Function=0,
          PreFunctionLv1=0,PreFunctionLv2=0,PreFunctionLv3=0,PreFunctionLv4=0,FunctionLv1=0,FunctionLv2=0,FunctionLv3=0,FunctionLv4=0,
          NumbeOfPretest7=0,NumbeOfTest7=0;

          var StructureScore=0,StructureCount=0,PreStructureScore=0,PreStructureCount=0,PreStructure=0,Structure=0,
          PreStructureLv1=0,PreStructureLv2=0,PreStructureLv3=0,PreStructureLv4=0,StructureLv1=0,StructureLv2=0,StructureLv3=0,StructureLv4=0,
          NumbeOfPretest8=0,NumbeOfTest8=0;

          var TicTacToeScore=0,TicTacToeCount=0;
          var LibrarySystemScore=0,LibrarySystemCount=0;
          var RoshamboScore=0,RoshamboCount=0;

          
          for(let i = 0; i < studentAll; i++) {
            if( StudentAnswer[i].contentName ==='question' ){
              var question = StudentAnswer[i].question;
              var answer = StudentAnswer[i].answer;
            }
            if( StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)' ){
              PreIntroductionLv1 = PreIntroductionLv1+StudentAnswer[i].scoreLV1;
              PreIntroductionLv2 = PreIntroductionLv2+StudentAnswer[i].scoreLV2;
              PreIntroductionLv3 = PreIntroductionLv3+StudentAnswer[i].scoreLV3;
              PreIntroductionLv4 = PreIntroductionLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreIntroductionBG,PreIntroductionBG2;
              PreIntroduction=1;
              NumbeOfPretest1 = NumbeOfPretest1+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreIntroductionScore = PreIntroductionLv1+PreIntroductionLv2+PreIntroductionLv3;}
              else{
                PreIntroductionScore = PreIntroductionLv1+PreIntroductionLv2+PreIntroductionLv3+PreIntroductionLv4;}
                PreIntroductionBG = "#66B7BD"
                PreIntroductionBG2 = "#bd7b67"
                PreIntroductionCount++;
            }
            if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)') {   
              PreStringLv1 = PreStringLv1+StudentAnswer[i].scoreLV1;
              PreStringLv2 = PreStringLv2+StudentAnswer[i].scoreLV2;
              PreStringLv3 = PreStringLv3+StudentAnswer[i].scoreLV3;
              PreStringLv4 = PreStringLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreStringBG,PreStringBG2;
              PreString = 1;
              NumbeOfPretest2 = NumbeOfPretest2+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreStringScore = PreStringLv1+PreStringLv2+PreStringLv3;}
              else{
                PreStringScore = PreStringLv1+PreStringLv2+PreStringLv3+PreStringLv4;}
                PreStringBG = "#66B7BD"
                PreStringBG2 = "#bd7b67"
                PreStringCount++;
            }
            if (StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)') {   
              PreDatatypeLv1 = PreDatatypeLv1+StudentAnswer[i].scoreLV1;
              PreDatatypeLv2 = PreDatatypeLv2+StudentAnswer[i].scoreLV2;
              PreDatatypeLv3 = PreDatatypeLv3+StudentAnswer[i].scoreLV3;
              PreDatatypeLv4 = PreDatatypeLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreDatatypeBG,PreDatatypeBG2;
              PreDatatype = 1;
              NumbeOfPretest3 = NumbeOfPretest3+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreDatatypeScore = PreDatatypeLv1+PreDatatypeLv2+PreDatatypeLv3;}
              else{
                PreDatatypeScore = PreDatatypeLv1+PreDatatypeLv2+PreDatatypeLv3+PreDatatypeLv4;}
                PreDatatypeBG = "#66B7BD"
                PreDatatypeBG2 = "#bd7b67"
                PreDatatypeCount++;
            } 
            if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)') {   
              PreOperatorsLv1 = PreOperatorsLv1+StudentAnswer[i].scoreLV1;
              PreOperatorsLv2 = PreOperatorsLv2+StudentAnswer[i].scoreLV2;
              PreOperatorsLv3 = PreOperatorsLv3+StudentAnswer[i].scoreLV3;
              PreOperatorsLv4 = PreOperatorsLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreOperatorsBG,PreOperatorsBG2;
              PreOperators = 1;
              NumbeOfPretest4 = NumbeOfPretest4+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreOperatorsScore = PreOperatorsLv1+PreOperatorsLv2+PreOperatorsLv3;}
              else{
                PreOperatorsScore = PreOperatorsLv1+PreOperatorsLv2+PreOperatorsLv3+PreOperatorsLv4;}
                PreOperatorsBG = "#66B7BD"
                PreOperatorsBG2 = "#bd7b67"
                PreOperatorsCount++;
            }
            if (StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)') {   
              PreFlowControlLv1 = PreFlowControlLv1+StudentAnswer[i].scoreLV1;
              PreFlowControlLv2 = PreFlowControlLv2+StudentAnswer[i].scoreLV2;
              PreFlowControlLv3 = PreFlowControlLv3+StudentAnswer[i].scoreLV3;
              PreFlowControlLv4 = PreFlowControlLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreFlowControlBG,PreFlowControlBG2;
              PreFlowControl =1;
              NumbeOfPretest5 = NumbeOfPretest5+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreFlowControlScore = PreFlowControlLv1+PreFlowControlLv2+PreFlowControlLv3;}
              else{
                PreFlowControlScore = PreFlowControlLv1+PreFlowControlLv2+PreFlowControlLv3+PreFlowControlLv4;}
                PreFlowControlBG = "#66B7BD"
                PreFlowControlBG2 = "#bd7b67"
                PreFlowControlCount++;
            }
            if (StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)') {   
              PrePointersLv1 = PrePointersLv1+StudentAnswer[i].scoreLV1;
              PrePointersLv2 = PrePointersLv2+StudentAnswer[i].scoreLV2;
              PrePointersLv3 = PrePointersLv3+StudentAnswer[i].scoreLV3;
              PrePointersLv4 = PrePointersLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PrePointersBG,PrePointersBG2;
              PrePointers=1;
              NumbeOfPretest6 = NumbeOfPretest6+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PrePointersScore = PrePointersLv1+PrePointersLv2+PrePointersLv3;}
              else{
                PrePointersScore = PrePointersLv1+PrePointersLv2+PrePointersLv3+PrePointersLv4;}
                PrePointersBG = "#66B7BD"
                PrePointersBG2 = "#bd7b67"
                PrePointersCount++;
            }
            if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)') {   
              PreFunctionLv1 = PreFunctionLv1+StudentAnswer[i].scoreLV1;
              PreFunctionLv2 = PreFunctionLv2+StudentAnswer[i].scoreLV2;
              PreFunctionLv3 = PreFunctionLv3+StudentAnswer[i].scoreLV3;
              PreFunctionLv4 = PreFunctionLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreFunctionBG,PreFunctionBG2;
              PreFunction=1;
              NumbeOfPretest7 =  NumbeOfPretest7+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreFunctionScore = PreFunctionLv1+PreFunctionLv2+PreFunctionLv3;}
              else{
                PreFunctionScore = PreFunctionLv1+PreFunctionLv2+PreFunctionLv3+PreFunctionLv4;}
                PreFunctionBG = "#66B7BD"
                PreFunctionBG2 = "#bd7b67"
                PreFunctionCount++;
            }
            if (StudentAnswer[i].contentName ==='Functions-(Pre-test)') {   
              PreStructureLv1 = PreStructureLv1+StudentAnswer[i].scoreLV1;
              PreStructureLv2 = PreStructureLv2+StudentAnswer[i].scoreLV2;
              PreStructureLv3 = PreStructureLv3+StudentAnswer[i].scoreLV3;
              PreStructureLv4 = PreStructureLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PreStructureBG,PreStructureBG2;
              PreStructure=1;
              NumbeOfPretest8 = NumbeOfPretest8+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreStructureScore = PreStructureLv1+PreStructureLv2+PreStructureLv3;}
              else{
                PreStructureScore = PreStructureLv1+PreStructureLv2+PreStructureLv3+PreStructureLv4;}
                PreStructureBG = "#66B7BD"
                PreStructureBG2 = "#bd7b67"
                PreStructureCount++;
            }
            if( StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)' ){
              IntroductionLv1 = IntroductionLv1+StudentAnswer[i].scoreLV1;
              IntroductionLv2 = IntroductionLv2+StudentAnswer[i].scoreLV2;
              IntroductionLv3 = IntroductionLv3+StudentAnswer[i].scoreLV3;
              IntroductionLv4 = IntroductionLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var IntroductionBG,IntroductionBG2;
              Introduction=1;
              NumbeOfTest1 = NumbeOfTest1+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                IntroductionScore = IntroductionLv1+IntroductionLv2+IntroductionLv3;}
              else{
                IntroductionScore = IntroductionLv1+IntroductionLv2+IntroductionLv3+IntroductionLv4;}
                IntroductionBG = "#66B7BD"
                IntroductionBG2 = "#bd7b67"
                IntroductionCount++;
            }
            if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)') {   
              StringLv1 = StringLv1+StudentAnswer[i].scoreLV1;
              StringLv2 = StringLv2+StudentAnswer[i].scoreLV2;
              StringLv3 = StringLv3+StudentAnswer[i].scoreLV3;
              StringLv4 = StringLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var StringBG,StringBG2;
              String=1;
              NumbeOfTest2 = NumbeOfTest2+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                StringScore = StringLv1+StringLv2+StringLv3;}
              else{
                StringScore = StringLv1+StringLv2+StringLv3+StringLv4;}
                StringBG = "#66B7BD"
                StringBG2 = "#bd7b67"
                StringCount++;
            }
            if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)') {   
              DatatypeLv1 = DatatypeLv1+StudentAnswer[i].scoreLV1;
              DatatypeLv2 = DatatypeLv2+StudentAnswer[i].scoreLV2;
              DatatypeLv3 = DatatypeLv3+StudentAnswer[i].scoreLV3;
              DatatypeLv4 = DatatypeLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var DatatypeBG,DatatypeBG2;
              Datatype=1;
              NumbeOfTest3 = NumbeOfTest3+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                DatatypeScore = DatatypeLv1+DatatypeLv2+DatatypeLv3;}
              else{
                DatatypeScore = DatatypeLv1+DatatypeLv2+DatatypeLv3+DatatypeLv4;}
                DatatypeBG = "#66B7BD"
                DatatypeBG2 = "#bd7b67"
                DatatypeCount++;
            } 
            if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)') {   
              OperatorsLv1 = OperatorsLv1+StudentAnswer[i].scoreLV1;
              OperatorsLv2 = OperatorsLv2+StudentAnswer[i].scoreLV2;
              OperatorsLv3 = OperatorsLv3+StudentAnswer[i].scoreLV3;
              OperatorsLv4 = OperatorsLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var OperatorsBG,OperatorsBG2;
              Operators=1;
              NumbeOfTest4 = NumbeOfTest4+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                OperatorsScore = OperatorsLv1+OperatorsLv2+OperatorsLv3;}
              else{
                OperatorsScore = OperatorsLv1+OperatorsLv2+OperatorsLv3+OperatorsLv4;}
                OperatorsBG = "#66B7BD"
                OperatorsBG2 = "#bd7b67"
                OperatorsCount++;
            }
            if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)') {   
              FlowControlLv1 = FlowControlLv1+StudentAnswer[i].scoreLV1;
              FlowControlLv2 = FlowControlLv2+StudentAnswer[i].scoreLV2;
              FlowControlLv3 = FlowControlLv3+StudentAnswer[i].scoreLV3;
              FlowControlLv4 = FlowControlLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var FlowControlBG,FlowControlBG2;
              FlowControl=1;
              NumbeOfTest5 = NumbeOfTest5+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                FlowControlScore = FlowControlLv1+FlowControlLv2+FlowControlLv3;}
              else{
                FlowControlScore = FlowControlLv1+FlowControlLv2+FlowControlLv3+FlowControlLv4;}
                FlowControlBG = "#66B7BD"
                FlowControlBG2 = "#bd7b67"
                FlowControlCount++;
            }
            if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)') {   
              PointersLv1 = PointersLv1+StudentAnswer[i].scoreLV1;
              PointersLv2 = PointersLv2+StudentAnswer[i].scoreLV2;
              PointersLv3 = PointersLv3+StudentAnswer[i].scoreLV3;
              PointersLv4 = PointersLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var PointersBG,PointersBG2;
              Pointers=1;
              NumbeOfTest6 = NumbeOfTest6+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                PointersScore = PointersLv1+PointersLv2+PointersLv3;}
              else{
                PointersScore = PointersLv1+PointersLv2+PointersLv3+PointersLv4;}
                PointersBG = "#66B7BD"
                PointersBG2 = "#bd7b67"
                PointersCount++;
            }
            if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)') {   
              FunctionLv1 = FunctionLv1+StudentAnswer[i].scoreLV1;
              FunctionLv2 = FunctionLv2+StudentAnswer[i].scoreLV2;
              FunctionLv3 = FunctionLv3+StudentAnswer[i].scoreLV3;
              FunctionLv4 = FunctionLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var FunctionBG,FunctionBG2;
              Function=1;
              NumbeOfTest7 = NumbeOfTest7+1;
              if(StudentAnswer[i].scoreTeacher === undefined){
                FunctionScore = FunctionLv1+FunctionLv2+FunctionLv3;}
              else{
                FunctionScore = FunctionLv1+FunctionLv2+FunctionLv3+FunctionLv4;}
                FunctionBG = "#66B7BD"
                FunctionBG2 = "#bd7b67"
                FunctionCount++;
            }
            if (StudentAnswer[i].contentName ==='Functions-(Post-test)') {   
              StructureLv1 = StructureLv1+StudentAnswer[i].scoreLV1;
              StructureLv2 = StructureLv2+StudentAnswer[i].scoreLV2;
              StructureLv3 = StructureLv3+StudentAnswer[i].scoreLV3;
              StructureLv4 = StructureLv4+parseInt(StudentAnswer[i].scoreTeacher);
              var StructureBG,StructureBG2;
              Structure=1;
              NumbeOfTest8 = NumbeOfTest8+1; 
              if(StudentAnswer[i].scoreTeacher === undefined){
                StructureScore = StructureLv1+StructureLv2+StructureLv3;}
              else{
                StructureScore = StructureLv1+StructureLv2+StructureLv3+StructureLv4;}
                StructureBG = "#66B7BD"
                StructureBG2 = "#bd7b67"
                StructureCount++;
            }
            
            /** */

            if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)') {   
              var TicTacToeBG;
              if(StudentAnswer[i].scoreQuiz === undefined){}
              else{
                TicTacToeScore = TicTacToeScore+parseInt(StudentAnswer[i].scoreQuiz);}
                TicTacToeBG = "#bd7b67"
                TicTacToeCount++;
            }
            if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)') {   
              var LibrarySystemBG;
              if(StudentAnswer[i].scoreQuiz === undefined){}
              else{
                LibrarySystemScore = LibrarySystemScore+parseInt(StudentAnswer[i].scoreQuiz);}
                LibrarySystemBG = "#bd7b67"
                LibrarySystemCount++;
            }
            if (StudentAnswer[i].contentName ==='Project_QUIZ3') {   
              var RoshamboBG;
              if(StudentAnswer[i].scoreQuiz === undefined){}
              else{
                RoshamboScore = RoshamboScore+parseInt(StudentAnswer[i].scoreQuiz);}
                RoshamboBG = "#bd7b67"
                RoshamboCount++;
            }
            
            if( StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)' ||
              StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)' || 
              StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)' ||
              StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)' ||
              StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)' ||
              StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)' ||
              StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)' ||
              StudentAnswer[i].contentName ==='Functions-(Pre-test)'
            ){
              if(StudentAnswer[i].scoreTeacher === undefined){
                PreKnowledgeScore = PreKnowledgeScore+StudentAnswer[i].scoreLV1
                PreTraceScore = PreTraceScore+StudentAnswer[i].scoreLV2
                PreExplainScore = PreExplainScore+StudentAnswer[i].scoreLV3
                PreWriteScore = 0;
              }
              else{
                PreKnowledgeScore = PreKnowledgeScore+StudentAnswer[i].scoreLV1
                PreTraceScore = PreTraceScore+StudentAnswer[i].scoreLV2
                PreExplainScore = PreExplainScore+StudentAnswer[i].scoreLV3
                PreWriteScore = PreWriteScore+parseInt(StudentAnswer[i].scoreTeacher);
              }
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
                  KnowledgeScore = KnowledgeScore+StudentAnswer[i].scoreLV1
                  TraceScore = TraceScore+StudentAnswer[i].scoreLV2
                  ExplainScore = ExplainScore+StudentAnswer[i].scoreLV3
                  WriteScore = 0;
                }
                else{
                  KnowledgeScore = KnowledgeScore+StudentAnswer[i].scoreLV1
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
            'Lab1 Algorithms and Flowcharts':{score:IntroductionScore},
            'Lab2 Datatype and Variable':{score:StringScore},
            'Lab3 Input and Output':{score:DatatypeScore},
            'Lab4 Operators and Expressions':{score:OperatorsScore},
            'Lab5 Selection Statements':{score:FlowControlScore},
            'Lab6 Loop Statements':{score:PointersScore},
            'Lab7 Arrays and Strings':{score:FunctionScore},
            'Lab8 Functions':{score:StructureScore}
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

          var PreKnowledgePercent =  Math.round(PreKnowledgeScore);
          var PreTracePercent= Math.round(PreTraceScore);
          var PreExplainPercent = Math.round(PreExplainScore);
          var PreWritePercent = Math.round(PreWriteScore/5);
          
          var KnowledgePercent =  Math.round(KnowledgeScore);
          var TracePercent= Math.round(TraceScore);
          var ExplainPercent = Math.round(ExplainScore);
          var WritePercent = Math.round(WriteScore/5);

          PreKnowledgePercent = PreKnowledgePercent;
          PreTracePercent = PreTracePercent;
          PreExplainPercent = PreExplainPercent;
          PreWritePercent = PreWritePercent;

          KnowledgePercent = KnowledgePercent;
          TracePercent = TracePercent;
          ExplainPercent = ExplainPercent;
          WritePercent = WritePercent;

          var pretest_progress=0;
          pretest_progress = PreIntroduction+PreString+PreDatatype+PreOperators+PreFlowControl+PrePointers+PreFunction+PreStructure;
          var posttest_progress=0;
          posttest_progress = Introduction+String+Datatype+Operators+FlowControl+Pointers+Function+Structure;

          var checksumper = KnowledgePercent+TracePercent+ExplainPercent+WritePercent
          console.log("\nCHECKSUM : " ,checksumper); //100

          res.render('index/index_teacher', { person ,sortedCourse,sortedProject,answer,question,
            pretest_progress,posttest_progress,
            NumbeOfPretest1,NumbeOfPretest2,NumbeOfPretest3,NumbeOfPretest4,NumbeOfPretest5,NumbeOfPretest6,NumbeOfPretest7,NumbeOfPretest8,
            NumbeOfTest1,NumbeOfTest2,NumbeOfTest3,NumbeOfTest4,NumbeOfTest5,NumbeOfTest6,NumbeOfTest7,NumbeOfTest8,

            PreKnowledgePercent,PreTracePercent,PreExplainPercent,PreWritePercent,
            KnowledgePercent,TracePercent,ExplainPercent,WritePercent,

            TicTacToeScore,TicTacToeBG,
            LibrarySystemScore,LibrarySystemBG,
            RoshamboScore,RoshamboBG,
            TicTacToeCount,LibrarySystemCount,RoshamboCount,
            
            IntroductionScore,IntroductionLv1,IntroductionLv2,IntroductionLv3,IntroductionLv4,IntroductionBG,IntroductionBG2,
            StringScore,StringLv1,StringLv2,StringLv3,StringLv4,StringBG,StringBG2,
            DatatypeScore,DatatypeLv1,DatatypeLv2,DatatypeLv3,DatatypeLv4,DatatypeBG,DatatypeBG2,
            OperatorsScore,OperatorsLv1,OperatorsLv2,OperatorsLv3,OperatorsLv4,OperatorsBG,OperatorsBG2,
            FlowControlScore,FlowControlLv1,FlowControlLv2,FlowControlLv3,FlowControlLv4,FlowControlBG,FlowControlBG2,
            PointersScore,PointersLv1,PointersLv2,PointersLv3,PointersLv4,PointersBG,PointersBG2,
            FunctionScore,FunctionLv1,FunctionLv2,FunctionLv3,FunctionLv4,FunctionBG,FunctionBG2,
            StructureScore,StructureLv1,StructureLv2,StructureLv3,StructureLv4,StructureBG,StructureBG2,
            
            PreIntroductionScore,PreIntroductionLv1,PreIntroductionLv2,PreIntroductionLv3,PreIntroductionLv4,PreIntroductionBG,PreIntroductionBG2,
            PreStringScore,PreStringLv1,PreStringLv2,PreStringLv3,PreStringLv4,PreStringBG,PreStringBG2,
            PreDatatypeScore,PreDatatypeLv1,PreDatatypeLv2,PreDatatypeLv3,PreDatatypeLv4,PreDatatypeBG,PreDatatypeBG2,
            PreOperatorsScore,PreOperatorsLv1,PreOperatorsLv2,PreOperatorsLv3,PreOperatorsLv4,PreOperatorsBG,PreOperatorsBG2,
            PreFlowControlScore,PreFlowControlLv1,PreFlowControlLv2,PreFlowControlLv3,PreFlowControlLv4,PreFlowControlBG,PreFlowControlBG2,
            PrePointersScore,PrePointersLv1,PrePointersLv2,PrePointersLv3,PrePointersLv4,PrePointersBG,PrePointersBG2,
            PreFunctionScore,PreFunctionLv1,PreFunctionLv2,PreFunctionLv3,PreFunctionLv4,PreFunctionBG,PreFunctionBG2,
            PreStructureScore,PreStructureLv1,PreStructureLv2,PreStructureLv3,PreStructureLv4,PreStructureBG,PreStructureBG2,

            IntroductionCount,StringCount,DatatypeCount,OperatorsCount,FlowControlCount,PointersCount,FunctionCount,StructureCount,
            PreIntroductionCount,PreStringCount,PreDatatypeCount,PreOperatorsCount,PreFlowControlCount,PrePointersCount,PreFunctionCount,PreStructureCount
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
                var pre1=0,pre2=0,pre3=0,pre4=0,pre5=0,pre6=0,pre7=0,pre8=0;
                var post1=0,post2=0,post3=0,post4=0,post5=0,post6=0,post7=0,post8=0;
                var pre1lv1=0,pre1lv2=0,pre1lv3=0,pre1lv4=0,
                    pre2lv1=0,pre2lv2=0,pre2lv3=0,pre2lv4=0,
                    pre3lv1=0,pre3lv2=0,pre3lv3=0,pre3lv4=0,
                    pre4lv1=0,pre4lv2=0,pre4lv3=0,pre4lv4=0,
                    pre5lv1=0,pre5lv2=0,pre5lv3=0,pre5lv4=0,
                    pre6lv1=0,pre6lv2=0,pre6lv3=0,pre6lv4=0,
                    pre7lv1=0,pre7lv2=0,pre7lv3=0,pre7lv4=0,
                    pre8lv1=0,pre8lv2=0,pre8lv3=0,pre8lv4=0;
                var post1lv1=0,post1lv2=0,post1lv3=0,post1lv4=0,
                    post2lv1=0,post2lv2=0,post2lv3=0,post2lv4=0,
                    post3lv1=0,post3lv2=0,post3lv3=0,post3lv4=0,
                    post4lv1=0,post4lv2=0,post4lv3=0,post4lv4=0,
                    post5lv1=0,post5lv2=0,post5lv3=0,post5lv4=0,
                    post6lv1=0,post6lv2=0,post6lv3=0,post6lv4=0,
                    post7lv1=0,post7lv2=0,post7lv3=0,post7lv4=0,
                    post8lv1=0,post8lv2=0,post8lv3=0,post8lv4=0;
        
                var Pretest1=0,Pretest2=0,Pretest3=0,Pretest4=0,Pretest5=0,Pretest6=0,Pretest7=0,Pretest8=0;
                var Posttest1=0,Posttest2=0,Posttest3=0,Posttest4=0,Posttest5=0,Posttest6=0,Posttest7=0,Posttest8=0;
                
                var Ticket_Booking_SystemDone = "ยังไม่ทำ" , Point_of_Sales_SystemDone = "ยังไม่ทำ" , Project_QUIZ3Done = "ยังไม่ทำ";
                var StudentAnswerLV1 = "", StudentAnswerLV2 = "" , StudentAnswerLV3 = "", StudentAnswerLV4 = "", StudentAnswerLV4W = "";
      
                for (let i = 0; i < Object.keys(StudentAnswer).length; i++) {

                  if(StudentAnswer[i].scoreLV1 >= 4){
                    StudentAnswerLV1 = StudentAnswer[i].scoreLV1
                  }
                  if(StudentAnswer[i].scoreLV2 >= 4){
                    StudentAnswerLV2 = StudentAnswer[i].scoreLV2
                  }
                  if(StudentAnswer[i].scoreLV3 >= 4){
                    StudentAnswerLV3 = StudentAnswer[i].scoreLV3
                  }
                  //** */
                  if(StudentAnswer[i].scoreLV1 <= 3 &&  StudentAnswer[i].scoreLV1 != undefined){
                    StudentAnswerLV1 = StudentAnswer[i].scoreLV1
                  }
                  if(StudentAnswer[i].scoreLV2 <= 3 &&  StudentAnswer[i].scoreLV2 != undefined){
                    StudentAnswerLV2 = StudentAnswer[i].scoreLV2 
                  }
                  if(StudentAnswer[i].scoreLV3 <= 3 &&  StudentAnswer[i].scoreLV3 != undefined){
                    StudentAnswerLV3 = StudentAnswer[i].scoreLV3
                  }
                  //** */
                  if(StudentAnswer[i].scoreTeacher != undefined){
                    StudentAnswerLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                    StudentAnswerLV4W = parseInt(StudentAnswer[i].scoreTeacher);
                  }else{
                    StudentAnswerLV4W= "รอตรวจ";
                    StudentAnswerLV4 = 0;
                  }
                

                  //** Pre-test */
                  if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)'){
                    Pretest1Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre1lv1 = StudentAnswerLV1;
                    pre1lv2 = StudentAnswerLV2;
                    pre1lv3 = StudentAnswerLV3;
                    pre1lv4 = StudentAnswerLV4;
                    Pretest1 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest1S = StudentAnswerLV4W;
                    pre1=1;
                  }
                  if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)'){
                    Pretest2Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre2lv1 = StudentAnswerLV1;
                    pre2lv2 = StudentAnswerLV2;
                    pre2lv3 = StudentAnswerLV3;
                    pre2lv4 = StudentAnswerLV4;
                    Pretest2 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest2S = StudentAnswerLV4W;
                    pre2=1;
                  }
                  if(StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)'){
                    Pretest3Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre3lv1 = StudentAnswerLV1;
                    pre3lv2 = StudentAnswerLV2;
                    pre3lv3 = StudentAnswerLV3;
                    pre3lv4 = StudentAnswerLV4;
                    Pretest3 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest3S = StudentAnswerLV4W;
                    pre3=1;
                  }
                  if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)'){
                    Pretest4Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre4lv1 = StudentAnswerLV1;
                    pre4lv2 = StudentAnswerLV2;
                    pre4lv3 = StudentAnswerLV3;
                    pre4lv4 = StudentAnswerLV4;
                    Pretest4 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest4S = StudentAnswerLV4W;
                    pre4=1;
                  }
                  if(StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)'){
                    Pretest5Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre5lv1 = StudentAnswerLV1;
                    pre5lv2 = StudentAnswerLV2;
                    pre5lv3 = StudentAnswerLV3;
                    pre5lv4 = StudentAnswerLV4;
                    Pretest5 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest5S = StudentAnswerLV4W;
                    pre5=1;
                  }
                  if(StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)'){
                    Pretest6Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre6lv1 = StudentAnswerLV1;
                    pre6lv2 = StudentAnswerLV2;
                    pre6lv3 = StudentAnswerLV3;
                    pre6lv4 = StudentAnswerLV4;
                    Pretest6 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest6S = StudentAnswerLV4W;
                    pre6=1;
                  }
                  if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)'){
                    Pretest7Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre7lv1 = StudentAnswerLV1;
                    pre7lv2 = StudentAnswerLV2;
                    pre7lv3 = StudentAnswerLV3;
                    pre7lv4 = StudentAnswerLV4;
                    Pretest7 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest7S = StudentAnswerLV4W;
                    pre7=1;
                  }
                  if(StudentAnswer[i].contentName ==='Functions-(Pre-test)'){
                    Pretest8Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    pre8lv1 = StudentAnswerLV1;
                    pre8lv2 = StudentAnswerLV2;
                    pre8lv3 = StudentAnswerLV3;
                    pre8lv4 = StudentAnswerLV4;
                    Pretest8 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Pretest8S = StudentAnswerLV4W;
                    pre8=1;
                  }
                  //** Post-test */
                  if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)'){
                    Posttest1Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post1lv1 = StudentAnswerLV1;
                    post1lv2 = StudentAnswerLV2;
                    post1lv3 = StudentAnswerLV3;
                    post1lv4 = StudentAnswerLV4;
                    Posttest1 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest1S = StudentAnswerLV4W;
                    post1=1;
                  }
                  if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)'){
                    Posttest2Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post2lv1 = StudentAnswerLV1;
                    post2lv2 = StudentAnswerLV2;
                    post2lv3 = StudentAnswerLV3;
                    post2lv4 = StudentAnswerLV4;
                    Posttest2 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest2S = StudentAnswerLV4W;
                    post2=1;
                  }
                  if(StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)'){
                    Posttest3Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post3lv1 = StudentAnswerLV1;
                    post3lv2 = StudentAnswerLV2;
                    post3lv3 = StudentAnswerLV3;
                    post3lv4 = StudentAnswerLV4;
                    Posttest3 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest3S = StudentAnswerLV4W;
                    post3=1;
                  }
                  if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)'){
                    Posttest4Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post4lv1 = StudentAnswerLV1;
                    post4lv2 = StudentAnswerLV2;
                    post4lv3 = StudentAnswerLV3;
                    post4lv4 = StudentAnswerLV4;
                    Posttest4 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest4S = StudentAnswerLV4W;
                    post4=1;
                  }
                  if(StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)'){
                    Posttest5Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post5lv1 = StudentAnswerLV1;
                    post5lv2 = StudentAnswerLV2;
                    post5lv3 = StudentAnswerLV3;
                    post5lv4 = StudentAnswerLV4;
                    Posttest5 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest5S = StudentAnswerLV4W;
                    post5=1;
                  }
                  if(StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)'){
                    Posttest6Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post6lv1 = StudentAnswerLV1;
                    post6lv2 = StudentAnswerLV2;
                    post6lv3 = StudentAnswerLV3;
                    post6lv4 = StudentAnswerLV4;
                    Posttest6 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest6S = StudentAnswerLV4W;
                    post6=1;
                  }
                  if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)'){
                    Posttest7Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post7lv1 = StudentAnswerLV1;
                    post7lv2 = StudentAnswerLV2;
                    post7lv3 = StudentAnswerLV3;
                    post7lv4 = StudentAnswerLV4;
                    Posttest7 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest7S = StudentAnswerLV4W;
                    post7=1;
                  }
                  if(StudentAnswer[i].contentName ==='Functions-(Post-test)'){
                    Posttest8Done = StudentAnswerLV1+"-"+StudentAnswerLV2+"-"+StudentAnswerLV3+"-"+StudentAnswerLV4W;
                    post8lv1 = StudentAnswerLV1;
                    post8lv2 = StudentAnswerLV2;
                    post8lv3 = StudentAnswerLV3;
                    post8lv4 = StudentAnswerLV4;
                    Posttest8 = StudentAnswerLV1+StudentAnswerLV2+StudentAnswerLV3+StudentAnswerLV4;
                    var Posttest8S = StudentAnswerLV4W;
                    post8=1;
                  }


                  var post_k = post1lv1+post2lv1+post3lv1+post4lv1+post5lv1+post6lv1+post7lv1+post8lv1;
                  var post_t = post1lv2+post2lv2+post3lv2+post4lv2+post5lv2+post6lv2+post7lv2+post8lv2;
                  var post_e = post1lv3+post2lv3+post3lv3+post4lv3+post5lv3+post6lv3+post7lv3+post8lv3;
                  var post_w =  Math.round((post1lv4+post2lv4+post3lv4+post4lv4+post5lv4+post6lv4+post7lv4+post8lv4)/5);


                  var pre = pre1+pre2+pre3+pre4+pre5+pre6+pre7+pre8;
                  var post = post1+post2+post3+post4+post5+post6+post7+post8;

                  //** Project-quiz */
                  if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)') {   
                    if(StudentAnswer[i].scoreQuiz != undefined){
                      Ticket_Booking_SystemDone = StudentAnswer[i].scoreQuiz;
                    }else{
                      Ticket_Booking_SystemDone = "รอตรวจ";
                    }
                    //var TicketBookingSystemScore = StudentAnswerLV4;
                  }
                  if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)') {   
                    if(StudentAnswer[i].scoreQuiz != undefined){
                      Point_of_Sales_SystemDone = StudentAnswer[i].scoreQuiz;
                    }else{
                      Point_of_Sales_SystemDone = "รอตรวจ";
                    }
                    //var Point_of_Sales_SystemScore = StudentAnswerLV4;
                  }
                  if (StudentAnswer[i].contentName ==='Project_QUIZ3') {   
                    if(StudentAnswer[i].scoreQuiz != undefined){
                      Project_QUIZ3Done = StudentAnswer[i].scoreQuiz;
                    }else{
                      Project_QUIZ3Done = "รอตรวจ";
                    }
                    //var Project_QUIZ3Score = StudentAnswerLV4;
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
                            pre:pre,
                            post:post,
                            post_k:post_k,
                            post_t:post_t,
                            post_e:post_e,
                            post_w:post_w,

                            //Project quiz
                            TicketBookingSystem:Ticket_Booking_SystemDone,
                            //TicketBookingSystemScore:TicketBookingSystemScore,

                            PointofSalesSystem:Point_of_Sales_SystemDone,
                            //Point_of_Sales_SystemScore:Point_of_Sales_SystemScore,

                            Project_QUIZ3:Project_QUIZ3Done,
                            //Project_QUIZ3Score:Project_QUIZ3Score,

                            //Post test
                            pre_Algorithms_and_Flowcharts:Pretest1Done,
                            Pretest1:Pretest1,Pretest1S:Pretest1S,
                            post_Algorithms_and_Flowcharts:Posttest1Done,
                            Posttest1:Posttest1,Posttest1S:Posttest1S,
                            pre1lv1:pre1lv1,pre1lv2:pre1lv2,pre1lv3:pre1lv3,pre1lv4:pre1lv4,
                            post1lv1:post1lv1,post1lv2:post1lv2,post1lv3:post1lv3,post1lv4:post1lv4,

                            pre_Datatype_and_Variable:Pretest2Done,
                            Pretest2:Pretest2,Pretest2S:Pretest2S,
                            post_Datatype_and_Variable:Posttest2Done,
                            Posttest2:Posttest2,Posttest2S:Posttest2S,
                            pre2lv1:pre2lv1,pre2lv2:pre2lv2,pre2lv3:pre2lv3,pre2lv4:pre2lv4,
                            post2lv1:post2lv1,post2lv2:post2lv2,post2lv3:post2lv3,post2lv4:post2lv4,

                            pre_Input_and_Output:Pretest3Done,
                            Pretest3:Pretest3,Pretest3S:Pretest3S,
                            post_Input_and_Output:Posttest3Done,
                            Posttest3:Posttest3,Posttest3S:Posttest3S,
                            pre3lv1:pre3lv1,pre3lv2:pre3lv2,pre3lv3:pre3lv3,pre3lv4:pre3lv4,
                            post3lv1:post3lv1,post3lv2:post3lv2,post3lv3:post3lv3,post3lv4:post3lv4,

                            pre_Operators_and_Expressions:Pretest4Done,
                            Pretest4:Pretest4,Pretest4S:Pretest4S,
                            post_Operators_and_Expressions:Posttest4Done,
                            Posttest4:Posttest4,Posttest4S:Posttest4S,
                            pre4lv1:pre4lv1,pre4lv2:pre4lv2,pre4lv3:pre4lv3,pre4lv4:pre4lv4,
                            post4lv1:post4lv1,post4lv2:post4lv2,post4lv3:post4lv3,post4lv4:post4lv4,

                            pre_Selection_Statements:Pretest5Done,
                            Pretest5:Pretest5,Pretest5S:Pretest5S,
                            post_Selection_Statements:Posttest5Done,
                            Posttest5:Posttest5,Posttest5S:Posttest5S,
                            pre5lv1:pre5lv1,pre5lv2:pre5lv2,pre5lv3:pre5lv3,pre5lv4:pre5lv4,
                            post5lv1:post5lv1,post5lv2:post5lv2,post5lv3:post5lv3,post5lv4:post5lv4,

                            pre_Loop_Statements:Pretest6Done,
                            Pretest6:Pretest6,Pretest6S:Pretest6S,
                            post_Loop_Statements:Posttest6Done,
                            Posttest6:Posttest6,Posttest6S:Posttest6S,
                            pre6lv1:pre6lv1,pre6lv2:pre6lv2,pre6lv3:pre6lv3,pre6lv4:pre6lv4,
                            post6lv1:post6lv1,post6lv2:post6lv2,post6lv3:post6lv3,post6lv4:post6lv4,

                            pre_Arrays_and_Strings:Pretest7Done,
                            Pretest7:Pretest7,Pretest7S:Pretest7S,
                            post_Arrays_and_Strings:Posttest7Done,
                            Posttest7:Posttest7,Posttest7S:Posttest7S,
                            pre7lv1:pre7lv1,pre7lv2:pre7lv2,pre7lv3:pre7lv3,pre7lv4:pre7lv4,
                            post7lv1:post7lv1,post7lv2:post7lv2,post7lv3:post7lv3,post7lv4:post7lv4,

                            pre_Functions:Pretest8Done,
                            Pretest8:Pretest8,Pretest8S:Pretest8S,
                            post_Functions:Posttest8Done,
                            Posttest8:Posttest8,Posttest8S:Posttest8S,
                            pre8lv1:pre8lv1,pre8lv2:pre8lv2,pre8lv3:pre8lv3,pre8lv4:pre8lv4,
                            post8lv1:post8lv1,post8lv2:post8lv2,post8lv3:post8lv3,post8lv4:post8lv4
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
                var Pretest1Done = 0 ,Pretest2Done = 0 ,Pretest3Done = 0,Pretest4Done = 0 ,Pretest5Done = 0,Pretest6Done = 0,Pretest7Done = 0,Pretest8Done = 0;
                var Posttest1Done = 0 ,Posttest2Done = 0 ,Posttest3Done = 0,Posttest4Done = 0 ,Posttest5Done = 0,Posttest6Done = 0,Posttest7Done = 0,Posttest8Done = 0;
                var PretestScore1 = "",PretestScore2 = "",PretestScore3 = "",PretestScore4 = "",PretestScore5 = "",PretestScore6 = "",PretestScore7 = "",PretestScore8 = "";
                var PosttestScore1 = "",PosttestScore2 = "",PosttestScore3 = "",PosttestScore4 = "",PosttestScore5 = "",PosttestScore6 = "",PosttestScore7 = "",PosttestScore8 = "";
        
                
                for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {
                  if( StudentAnswer[i].contentName ==='question' ){
                    var answer = "";
                    answer = StudentAnswer[i].question;
                  }
                  if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)') {   
                      IntroductionLV1 = StudentAnswer[i].scoreLV1;
                      IntroductionLV2 = StudentAnswer[i].scoreLV2;
                      IntroductionLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        IntroductionLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{IntroductionLV4 = IntroductionLV4}
                      
                      PretestScore1 = IntroductionLV1+IntroductionLV2+IntroductionLV3+IntroductionLV4;
                      Pretest1Done = 1;
                  }      
                  if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)') {   
                      StringLV1 = StudentAnswer[i].scoreLV1;
                      StringLV2 = StudentAnswer[i].scoreLV2;
                      StringLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        StringLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{StringLV4 = StringLV4}

                      PretestScore2 = StringLV1+StringLV2+StringLV3+StringLV4;
                      Pretest2Done = 1;
                  } 
                  if (StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)') {   
                      DatatypeLV1 = StudentAnswer[i].scoreLV1;
                      DatatypeLV2 = StudentAnswer[i].scoreLV2;
                      DatatypeLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        DatatypeLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{DatatypeLV4 = DatatypeLV4}

                      PretestScore3 = DatatypeLV1+DatatypeLV2+DatatypeLV3+DatatypeLV4;
                      Pretest3Done = 1;
                  } 
                  if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)') {   
                      OperatorsLV1 = StudentAnswer[i].scoreLV1;
                      OperatorsLV2 = StudentAnswer[i].scoreLV2;
                      OperatorsLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        OperatorsLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{OperatorsLV4 = OperatorsLV4}

                      PretestScore4 = OperatorsLV1+OperatorsLV2+OperatorsLV3+OperatorsLV4;
                      Pretest4Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)') {   
                      FlowControlLV1 = StudentAnswer[i].scoreLV1;
                      FlowControlLV2 = StudentAnswer[i].scoreLV2;
                      FlowControlLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        FlowControlLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{FlowControlLV4 = FlowControlLV4}
                      
                      PretestScore5 = FlowControlLV1+FlowControlLV2+FlowControlLV3+FlowControlLV4;
                      Pretest5Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)') {   
                      PointersLV1 = StudentAnswer[i].scoreLV1;
                      PointersLV2 = StudentAnswer[i].scoreLV2;
                      PointersLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        PointersLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{PointersLV4 = PointersLV4}

                      PretestScore6 = PointersLV1+PointersLV2+PointersLV3+PointersLV4;
                      Pretest6Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)') {   
                      FunctionLV1 = StudentAnswer[i].scoreLV1;
                      FunctionLV2 = StudentAnswer[i].scoreLV2;
                      FunctionLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        FunctionLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{FunctionLV4 = FunctionLV4}

                      PretestScore7 = FunctionLV1+FunctionLV2+FunctionLV3+FunctionLV4;
                      Pretest7Done = 1;
                  }
                  if (StudentAnswer[i].contentName ==='Functions-(Pre-test)') {   
                      StructureLV1 = StudentAnswer[i].scoreLV1;
                      StructureLV2 = StudentAnswer[i].scoreLV2;
                      StructureLV3 = StudentAnswer[i].scoreLV3;
                      if(StudentAnswer[i].scoreTeacher != undefined){
                        StructureLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                      }else{StructureLV4 = StructureLV4}

                      PretestScore8 = StructureLV1+StructureLV2+StructureLV3+StructureLV4;
                      Pretest8Done = 1;
                  }
                /** Post-test */
                    if (StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Post-test)') {   
                        IntroductionScoreLV1 = StudentAnswer[i].scoreLV1;
                        IntroductionScoreLV2 = StudentAnswer[i].scoreLV2;
                        IntroductionScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          IntroductionScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{IntroductionScoreLV4 = IntroductionScoreLV4}
                        
                        PosttestScore1 = IntroductionScoreLV1+IntroductionScoreLV2+IntroductionScoreLV3+IntroductionScoreLV4;
                        Posttest1Done = 1;
                    }      
                    if (StudentAnswer[i].contentName ==='Datatype_and_Variable-(Post-test)') {   
                        StringScoreLV1 = StudentAnswer[i].scoreLV1;
                        StringScoreLV2 = StudentAnswer[i].scoreLV2;
                        StringScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          StringScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{StringScoreLV4 = StringScoreLV4}

                        PosttestScore2 = StringScoreLV1+StringScoreLV2+StringScoreLV3+StringScoreLV4;
                        Posttest2Done = 1;
                    } 
                    if (StudentAnswer[i].contentName ==='Input_and_Output-(Post-test)') {   
                        DatatypeScoreLV1 = StudentAnswer[i].scoreLV1;
                        DatatypeScoreLV2 = StudentAnswer[i].scoreLV2;
                        DatatypeScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          DatatypeScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{DatatypeScoreLV4 = DatatypeScoreLV4}
                        
                        PosttestScore3 = DatatypeScoreLV1+DatatypeScoreLV2+DatatypeScoreLV3+DatatypeScoreLV4;
                        Posttest3Done = 1;
                    } 
                    if (StudentAnswer[i].contentName ==='Operators_and_Expressions-(Post-test)') {   
                        OperatorsScoreLV1 = StudentAnswer[i].scoreLV1;
                        OperatorsScoreLV2 = StudentAnswer[i].scoreLV2;
                        OperatorsScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          OperatorsScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{OperatorsScoreLV4 = OperatorsScoreLV4}

                        PosttestScore4 = OperatorsScoreLV1+OperatorsScoreLV2+OperatorsScoreLV3+OperatorsScoreLV4;
                        Posttest4Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Selection_Statements-(Post-test)') {   
                        FlowControlScoreLV1 = StudentAnswer[i].scoreLV1;
                        FlowControlScoreLV2 = StudentAnswer[i].scoreLV2;
                        FlowControlScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          FlowControlScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{FlowControlScoreLV4 = FlowControlScoreLV4}

                        PosttestScore5 = FlowControlScoreLV1+FlowControlScoreLV2+FlowControlScoreLV3+FlowControlScoreLV4;
                        Posttest5Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Loop_Statements-(Post-test)') {   
                        PointersScoreLV1 = StudentAnswer[i].scoreLV1;
                        PointersScoreLV2 = StudentAnswer[i].scoreLV2;
                        PointersScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          PointersScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{PointersScoreLV4 = PointersScoreLV4}

                        PosttestScore6 = PointersScoreLV1+PointersScoreLV3+PointersScoreLV3+PointersScoreLV4;
                        Posttest6Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Arrays_and_Strings-(Post-test)') {   
                        FunctionScoreLV1 = StudentAnswer[i].scoreLV1;
                        FunctionScoreLV2 = StudentAnswer[i].scoreLV2;
                        FunctionScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          FunctionScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{FunctionScoreLV4 = FunctionScoreLV4}

                        PosttestScore7 = FunctionScoreLV1+FunctionScoreLV2+FunctionScoreLV3+FunctionScoreLV4;
                        Posttest7Done = 1;
                    }
                    if (StudentAnswer[i].contentName ==='Functions-(Post-test)') {   
                        StructureScoreLV1 = StudentAnswer[i].scoreLV1;
                        StructureScoreLV2 = StudentAnswer[i].scoreLV2;
                        StructureScoreLV3 = StudentAnswer[i].scoreLV3;
                        if(StudentAnswer[i].scoreTeacher != undefined){
                          StructureScoreLV4 = parseInt(StudentAnswer[i].scoreTeacher);
                        }else{StructureScoreLV4 = StructureScoreLV4}

                        PosttestScore8 = StructureScoreLV1+StructureScoreLV2+StructureScoreLV3+StructureScoreLV4;
                        Posttest8Done = 1;
                    }
                  
                 
              }
              var PrjQuiz1Score = "ยังไม่ได้ทำ", PrjQuiz2Score = "ยังไม่ได้ทำ", PrjQuiz3Score = "ยังไม่ได้ทำ" 
              var Quiz1Score = "", Quiz2Score = "", Quiz3Score =""
              for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {
                    if (StudentAnswer[i].contentName ==='TicketBookingSystem-(Project_quiz1)') {   
                      Ticket_Booking_SystemDone = 1;
                        if (StudentAnswer[i].scoreQuiz === undefined) {
                          PrjQuiz1Score = "รอตรวจ"
                        } else {PrjQuiz1Score = parseInt(StudentAnswer[i].scoreQuiz) + "/100";
                          Quiz1Score = parseInt(StudentAnswer[i].scoreQuiz)
                        }
                    }
                    if (StudentAnswer[i].contentName ==='PointofSalesSystem-(Project_quiz2)') {   
                        Point_of_Sales_SystemDone = 1;
                        if (StudentAnswer[i].scoreQuiz === undefined) {
                          PrjQuiz2Score = "รอตรวจ"
                        } else {PrjQuiz2Score = parseInt(StudentAnswer[i].scoreQuiz) + "/100";
                          Quiz2Score = parseInt(StudentAnswer[i].scoreQuiz)
                        }
                    }
                    if (StudentAnswer[i].contentName ==='Project_QUIZ3') {   
                        Project_QUIZ3Done = 1;
                        if (StudentAnswer[i].scoreQuiz === undefined) {
                          PrjQuiz3Score = "รอตรวจ"
                        } else {PrjQuiz3Score = parseInt(StudentAnswer[i].scoreQuiz) + "/100";
                          Quiz3Score = parseInt(StudentAnswer[i].scoreQuiz)
                        }
                    }
              }

                /*** SUM */
                var Pretest = 0;
                Pretest = Pretest1Done+Pretest2Done+Pretest3Done+Pretest4Done+Pretest5Done+Pretest6Done+Pretest7Done+Pretest8Done;
                var Posttest = 0;
                Posttest = Posttest1Done+Posttest2Done+Posttest3Done+Posttest4Done+Posttest5Done+Posttest6Done+Posttest7Done+Posttest8Done

                //*** Chart Pretest score */
                var PreBasicScore = IntroductionLV1+StringLV1+DatatypeLV1+OperatorsLV1+FlowControlLV1+PointersLV1+FunctionLV1+StructureLV1 ;
                var PreTraceScore = IntroductionLV2+StringLV2+DatatypeLV2+OperatorsLV2+FlowControlLV2+PointersLV2+FunctionLV2+StructureLV2 ;
                var PreExplainScore = IntroductionLV3+StringLV3+DatatypeLV3+OperatorsLV3+FlowControlLV3+PointersLV3+FunctionLV3+StructureLV3 ;
                var PreWriteScore = IntroductionLV4+StringLV4+DatatypeLV4+OperatorsLV4+FlowControlLV4+PointersLV4+FunctionLV4+StructureLV4 ;

                var PreBasic =  Math.round(PreBasicScore);
                var PreTrace= Math.round(PreTraceScore);
                var PreExplain = Math.round(PreExplainScore);
                var PreWrite = Math.round(PreWriteScore);
                PreBasic = PreBasic;
                PreTrace = PreTrace;
                PreExplain = PreExplain;
                PreWrite = PreWrite;

                var PreBasicPercent = Math.round((PreBasicScore/40)*100);
                var PreTracePercent = Math.round((PreTraceScore/40)*100);
                var PreExplainPercent = Math.round((PreExplainScore/40)*100);
                var PreWritePercent = Math.round((PreWriteScore/200)*100);
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
                
                var Basic =  Math.round(BasicScore);
                var Trace= Math.round(TraceScore);
                var Explain = Math.round(ExplainScore);
                var Write = Math.round(WriteScore);
                Basic = Basic;
                Trace = Trace;
                Explain = Explain;
                Write = Write;

                var BasicPercent = Math.round((BasicScore/40)*100);
                var TracePercent = Math.round((TraceScore/40)*100);
                var ExplainPercent = Math.round((ExplainScore/40)*100);
                var WritePercent = Math.round((WriteScore/200)*100);
                BasicPercent = BasicPercent;
                TracePercent = TracePercent;
                ExplainPercent = ExplainPercent;
                WritePercent = WritePercent;
                
                //** Project Quiz Score */
               
                
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


                    


                    res.render('index/index_student', { person ,result,RecommendaResult,StudentAnswer,answer,
                      Pretest,Posttest,
                      PrjQuiz1Score,PrjQuiz2Score,PrjQuiz3Score,
                      Quiz1Score,Quiz2Score,Quiz3Score,
                      BasicPercent,TracePercent,ExplainPercent,WritePercent,
                      PreBasicPercent,PreTracePercent,PreExplainPercent,PreWritePercent,
                      Basic,Trace,Explain,Write,
                      PreBasic,PreTrace,PreExplain,PreWrite,
                      TicketBooking_SystemPercent,PointofSales_SystemPercent,ProjectQUIZ3Percent,

                      PretestScore1 ,PretestScore2 ,PretestScore3 ,PretestScore4 ,PretestScore5 ,PretestScore6 ,PretestScore7 ,PretestScore8,
                      PosttestScore1 ,PosttestScore2 ,PosttestScore3 ,PosttestScore4 ,PosttestScore5 ,PosttestScore6 ,PosttestScore7 ,PosttestScore8
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
        
                        var Pretest1Done = " - " ,Pretest2Done = " - ",Pretest3Done = " - " ,Pretest4Done = " - " ,Pretest5Done = " - ",Pretest6Done = " - ",Pretest7Done = " - ",Pretest8Done = " - ";
                        var Posttest1Done = " - " ,Posttest2Done = " - ",Posttest3Done = " - " ,Posttest4Done = " - " ,Posttest5Done = " - ",Posttest6Done = " - ",Posttest7Done = " - ",Posttest8Done = " - ";
                        var Ticket_Booking_SystemDone = " - " , Point_of_Sales_SystemDone = " - " , Project_QUIZ3Done = " - ";
              
                        for (let i = 0; i < Object.keys(StudentAnswer).length; i++) {
        
                        if(StudentAnswer[i].contentName ==='Algorithms_and_Flowcharts-(Pre-test)'){
                          Pretest1Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Datatype_and_Variable-(Pre-test)'){
                          Pretest2Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Input_and_Output-(Pre-test)'){
                          Pretest3Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Operators_and_Expressions-(Pre-test)'){
                          Pretest4Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Selection_Statements-(Pre-test)'){
                          Pretest5Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Loop_Statements-(Pre-test)'){
                          Pretest6Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Arrays_and_Strings-(Pre-test)'){
                          Pretest7Done = "YES";
                        }
                        if(StudentAnswer[i].contentName ==='Functions-(Pre-test)'){
                          Pretest8Done = "YES";
                        }

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
