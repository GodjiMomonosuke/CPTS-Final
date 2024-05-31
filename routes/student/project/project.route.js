const router = require('express').Router();
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
        if (err) throw err;
        if(Object.keys(StudentAnswer).length === 0){
          res.redirect('/')
        }
        else{
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mydatabase);
            var query = {email:person.email};
            dbo.collection("StudentProject").find(query).toArray(function(err, StudentProjectResult) {
              if (err) throw err;
              db.close();
              //console.log(RecommendaResult[0].CalculatorPercent)
              var RecommendaResult = StudentProjectResult 
              var PrjQuiz1Score = "ยังไม่ได้ทำ", PrjQuiz2Score = "ยังไม่ได้ทำ", PrjQuiz3Score = "ยังไม่ได้ทำ" 
              for(let i = 0; i < Object.keys(StudentAnswer).length; i++) {
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
              
              res.render('student/project/project_main', { person,RecommendaResult,StudentAnswer,PrjQuiz1Score,PrjQuiz2Score,PrjQuiz3Score});

            });
            
          });
          

          
        }

      });
    });
    // PRETEST Check
      
  }
});

module.exports = router;