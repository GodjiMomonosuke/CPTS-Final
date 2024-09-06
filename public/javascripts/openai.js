/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "พิมพ์ภาษาไทย"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "ได้สิ!  ฉันสามารถสื่อสารและเข้าใจภาษาไทยได้  \n\nคุณต้องการให้ฉันทำอะไรเป็นภาษาไทยคะ  \n\n \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "hi"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "สวัสดีค่ะ \n\nมีอะไรให้ฉันช่วยไหมคะ  \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "hello"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "สวัสดีค่ะ \n\nยินดีที่ได้คุยด้วย  มีอะไรให้ช่วยไหมคะ \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();

// Route สำหรับให้บริการหน้า HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/openai.html');
});

// Route สำหรับ API แชท
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req:', userInput);
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

// เซิร์ฟเวอร์เริ่มทำงานที่พอร์ต 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});