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
                if(result[i].scoreTeacher === undefined){
                    student.push(result[i])
                }
            }
            if(Object.keys(student).length === 0){
                student.push("null")
            }
            res.render('teacher/check', { person ,student});
            db.close();
        });
      });
  }
});

/** teacher send student score */
router.post('/submit', async (req, res, next) => {
    const person = req.user;
    
    var score16_1 = parseInt(req.body.studentScore16_1);
    var score16_2 = parseInt(req.body.studentScore16_2);
    var score16_3 = parseInt(req.body.studentScore16_3);
    var score17_1 = parseInt(req.body.studentScore17_1);
    var score17_2 = parseInt(req.body.studentScore17_2);
    var score17_3 = parseInt(req.body.studentScore17_3);
    var score18_1 = parseInt(req.body.studentScore18_1);
    var score18_2 = parseInt(req.body.studentScore18_2);
    var score18_3 = parseInt(req.body.studentScore18_3);
    var score19_1 = parseInt(req.body.studentScore19_1);
    var score19_2 = parseInt(req.body.studentScore19_2);
    var score19_3 = parseInt(req.body.studentScore19_3);
    var score20_1 = parseInt(req.body.studentScore20_1);
    var score20_2 = parseInt(req.body.studentScore20_2);
    var score20_3 = parseInt(req.body.studentScore20_3);

    var score = score16_1+score16_2+score16_3+score17_1+score17_2+score17_3+score18_1+score18_2+score18_3+score19_1+score19_2+score19_3+score20_1+score20_2+score20_3;
    var idStudent = req.body.idStudent;
    
    if(idStudent === ""){}
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mydatabase);
            var myquery = {_id:ObjectId(idStudent)};
            var newvalues = { $set: {scoreTeacher: score ,checkedBy:person.email} };
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
