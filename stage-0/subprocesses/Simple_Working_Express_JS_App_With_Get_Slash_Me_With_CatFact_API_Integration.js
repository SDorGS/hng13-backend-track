const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/me', async (req, res) => {
  const r = await fetch('https://catfact.ninja/fact');
  const j = await r.json();
  res.json({ fact: j.fact });
});

app.listen(3000);
