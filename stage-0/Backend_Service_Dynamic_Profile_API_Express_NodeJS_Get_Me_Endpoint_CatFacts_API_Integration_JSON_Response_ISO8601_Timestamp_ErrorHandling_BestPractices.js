const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/me', async (req, res) => {
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 5000));
    const r = await Promise.race([fetch('https://catfact.ninja/fact'), timeout]);
    if (!r.ok) throw new Error('API failed');
    const j = await r.json();

    res.json({
      status: "success",
      user: {
        email: "danielsolomongs888@gmail.com",
        name: "Solomon Daniel Buyikunmi",
        stack: "Node.js/Express"
      },
      timestamp: new Date().toISOString(),
      fact: j.fact
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact",
      error: e.message
    });
  }
});

app.listen(3000);
