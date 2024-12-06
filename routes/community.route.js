const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net";
const mydatabase = "Cluster0";
const { ensureLoggedIn } = require('connect-ensure-login');

// แสดงโพสต์ทั้งหมด
router.get('/', ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res) => {
    const person = req.user;
    console.log('Current user:', person); // Debug log
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);

        dbo.collection("Posts").find({}).sort({ createdAt: -1 }).toArray(function(err, posts) {
            if (err) {
                console.error("Error loading posts:", err);
                res.redirect('/');
                return;
            }
            console.log('Posts:', posts); // Debug log
            res.render('community', { 
                person: person,
                posts: posts
            });
            db.close();
        });
    });
});

// สร้างโพสต์ใหม่
router.post('/', ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res) => {
    const person = req.user;
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydatabase);
        var myobj = {
            content: req.body.content,
            email: person.email,
            name: person.name || person.email,
            createdAt: new Date()
        };
        
        dbo.collection("Posts").insertOne(myobj, function(err, result) {
            if (err) {
                req.flash('error', 'ไม่สามารถสร้างโพสต์ได้');
            } else {
                req.flash('success', 'โพสต์สำเร็จ');
            }
            db.close();
            res.redirect('/community');
        });
    });
});

// ลบโพสต์
router.delete('/:id', ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res) => {
    const person = req.user;
    try {
        const postId = new ObjectID(req.params.id);
        
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mydatabase);
            
            dbo.collection("Posts").findOne({ _id: postId }, function(err, post) {
                if (err || !post) {
                    res.status(404).json({ error: 'ไม่พบโพสต์' });
                    db.close();
                    return;
                }
                
                if (post.email !== person.email && person.role !== 'teacher') {
                    res.status(403).json({ error: 'ไม่มีสิทธิ์ลบโพสต์นี้' });
                    db.close();
                    return;
                }
                
                dbo.collection("Posts").deleteOne({ _id: postId }, function(err, result) {
                    if (err) {
                        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบโพสต์' });
                    } else {
                        res.json({ message: 'ลบโพสต์สำเร็จ' });
                    }
                    db.close();
                });
            });
        });
    } catch (error) {
        res.status(400).json({ error: 'รูปแบบ ID ไม่ถูกต้อง' });
    }
});



module.exports = router;