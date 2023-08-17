const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json()); // parse JSON requests
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/chat', async (req, res) => {
  const body = req.body;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPEN_API_KEY}`
    },
    body: JSON.stringify(data)
  })

  res.json(await response.json())
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY
})

const openai = new OpenAIApi(configuration);

app.post('/api/general', async (req, res) => {
  const body = req.body;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: body.prompt }],
  });

  // console.log(completion.choices[0]);
  return res.json(completion.data.choices[0].message);
});

app.post('/api/image', async (req, res) => {

})

app.post('/api/recipe', async (req, res) => {

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
