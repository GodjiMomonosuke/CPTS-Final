const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

router.get('/', async (req, res, next) => {
  const person = req.user;
  if(person != undefined){

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mydatabase);
      var query = {email:person.email};
      dbo.collection("StudentRecommendation").find(query).toArray(function(err) {
        if (err) throw err;
    
        res.render('teacher/TeacherLabquiz/7_Arrays_and_Strings-lab', { person  });
      });
    });

     
  }
});



module.exports = router;



