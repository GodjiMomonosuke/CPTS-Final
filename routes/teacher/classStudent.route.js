const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";

var mycollection = "TeacherClass";

/* GET home page. */
router.get('/', function(req, res, next) {
  const person = req.user;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mydatabase);
    var query = { email:person.email};
    dbo.collection(mycollection).find(query).toArray(function(err, classResult) {
      if (err) throw err;

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var query = {teacher:person.email };
        dbo.collection("StudentClass").find(query).toArray(function(err, Studentresult) {
          if (err) throw err;
          
          // ดึงข้อมูลคะแนนของนักเรียนจาก Studentresult
          // สมมติว่า Studentresult มีข้อมูลคะแนนในรูปแบบเปอร์เซ็นต์
          let BasicPercent = 0, TracePercent = 0, ExplainPercent = 0, WritePercent = 0;
          
          if (Studentresult && Studentresult.length > 0) {
            // สมมติว่า Studentresult[0] มีข้อมูลคะแนนอยู่
            BasicPercent = Studentresult[0].post_k || 0;
            TracePercent = Studentresult[0].post_t || 0;
            ExplainPercent = Studentresult[0].post_e || 0;
            WritePercent = Studentresult[0].post_w || 0;
          }
          
          // ส่งตัวแปรคะแนนไปยังเทมเพลต
          res.render('teacher/class-Student', {
            person,
            classResult,
            Studentresult,
            BasicPercent,
            TracePercent,
            ExplainPercent,
            WritePercent
          });
        });
      });
    });
  });  
});



router.post('/create', async (req, res, next) => {
  try {
    const person = req.user;
    const createSection = req.body.section;
    const createCourse = req.body.coursename;
    if(person.role === "Teacher"){
      var ClassTokenID = makeid(6);
 
      var classInsert = {
        times: new Date().toLocaleString(),
        email:person.email,
        role: person.role,
        course: createCourse,
        section: createSection,
        token: ClassTokenID
      }; 
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var myobj = classInsert;
        dbo.collection(mycollection).insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close();
        });
      });
      res.redirect('back')
    }
    
    
  } catch (error) {
    next(error);
  }
});

router.post('/remove', async (req, res, next) => {
  try {
    const person = req.user;
    const removeToken = req.body.classid;
    if(person.role === "Teacher"){
   
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var myquery = { token: removeToken };
        dbo.collection(mycollection).deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
      });

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var myquery = { token: removeToken };
        dbo.collection("StudentClass").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
      });

    }  
    res.redirect('back')
  } catch (error) {
    next(error);
  }
});

router.post('/kick', async (req, res, next) => {
  try {
    const person = req.user;
    const studentEmail = req.body.studentEmail;
    if(person.role === "Teacher"){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var myquery = { email: studentEmail};
        dbo.collection("StudentClass").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
      });

    }
    res.redirect('back')
  } catch (error) {
    next(error);
  }
});

module.exports = router;


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "APPT-"+result
}

