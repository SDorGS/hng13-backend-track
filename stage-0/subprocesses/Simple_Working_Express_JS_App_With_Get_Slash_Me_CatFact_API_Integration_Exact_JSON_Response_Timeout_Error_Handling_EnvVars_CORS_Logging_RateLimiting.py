const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors());
app.use(rateLimit({ windowMs: 60 * 1000, max: 30 }));

app.get('/me', async (req, res) => {
  console.log(`[${new Date().toISOString()}] /me requested`);
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
    res.status(502).json({
      status: "error",
      message: "Could not fetch cat fact",
      fallback: "Cats sleep for most of the day — usually 12 to 16 hours!",
      error: e.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
