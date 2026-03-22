require('dotenv').config();
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key loaded:", apiKey ? `Yes (${apiKey.substring(0, 5)}...)` : "No");

const data = JSON.stringify({
  contents: [{ parts: [{ text: "Respond 'Hello'" }] }]
});

const req = https.request({
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let responseData = '';
  res.on('data', chunk => responseData += chunk);
  res.on('end', () => console.log('Response:', responseData));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
