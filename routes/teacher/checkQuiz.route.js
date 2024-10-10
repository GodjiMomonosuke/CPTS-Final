const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";


router.get('/', async (req, res, next) => {
  const person = req.user;
  if(person != undefined){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        //var query = { code:/.*m.*/};
        var query = { lang:"C"};
        dbo.collection("StudentAnswer").find(query).toArray(function(err, result) {
            if (err) throw err;
            var student = []
            for (let i = 0; i < Object.keys(result).length; i++) {
                if(result[i].scoreQuiz === undefined){
                    student.push(result[i])
                }
            }
            if(Object.keys(student).length === 0){
                student.push("null")
            }
            res.render('teacher/checkQuiz', { person ,student});
            db.close();
        });
      });
  }
});

/** teacher send student score */
router.post('/submit', async (req, res, next) => {
    const person = req.user;
    
    var score1 = parseInt(req.body.studentScore1);
    var score2 = parseInt(req.body.studentScore2);
    var score3 = parseInt(req.body.studentScore3);
    var score4 = parseInt(req.body.studentScore4);


    var score = score1+score2+score3+score4;
    var idStudent = req.body.idStudent;
    
    if(idStudent === ""){}
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mydatabase);
            var myquery = {_id:ObjectId(idStudent)};
            var newvalues = { $set: {scoreQuiz: score ,checkedBy:person.email} };
            dbo.collection("StudentAnswer").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            db.close();
            });
        });
    }
    try {
        res.redirect('back')    
    } catch (error) {
      next(error);
    }
});

module.exports = router;
