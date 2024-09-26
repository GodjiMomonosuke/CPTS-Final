const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('../../utils/constants');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

// มิดเดิลแวร์เพื่อตรวจสอบว่าผู้ใช้เป็นนักเรียน
const ensureStudent = (req, res, next) => {
  if (req.user && req.user.role === roles.student) {
    next();
  } else {
    req.flash('error', 'คุณต้องเป็นนักเรียนเพื่อเข้าถึงหน้านี้');
    res.redirect('/');
  }
};

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // ... (โค้ดส่วนการตั้งค่า chat ยังคงเหมือนเดิม)

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

// เส้นทางสำหรับหน้า AI chat
router.get('/index_ai', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureStudent, (req, res) => {
  res.render('index_ai');
});

// API endpoint สำหรับการแชท
router.post('/chat', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureStudent, async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;