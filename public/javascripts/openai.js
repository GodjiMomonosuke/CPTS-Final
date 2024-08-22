require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Unable to get response' });
    }
});
