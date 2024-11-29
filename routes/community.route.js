const router = require('express').Router();
const Post = require('../models/Post');

// แสดงหน้า community
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username email')
            .sort('-createdAt');
        res.render('community', { 
            posts,
            user: req.user
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'ไม่สามารถโหลดโพสต์ได้');
        res.redirect('back');
    }
});

// สร้างโพสต์ใหม่
router.post('/', async (req, res) => {
    try {
        const post = new Post({
            content: req.body.content,
            author: req.user._id
        });
        await post.save();
        req.flash('success', 'โพสต์สำเร็จ');
        res.redirect('/community');
    } catch (error) {
        console.error(error);
        req.flash('error', 'ไม่สามารถสร้างโพสต์ได้');
        res.redirect('/community');
    }
});

// ลบโพสต์
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'ไม่พบโพสต์' });
        }
        
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'ไม่มีสิทธิ์ลบโพสต์นี้' });
        }
        
        await post.remove();
        res.json({ message: 'ลบโพสต์สำเร็จ' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบโพสต์' });
    }
});

module.exports = router;