const express = require('express');
const app = express();

app.get('/me', (req, res) => res.json({ message: 'ok' }));

app.listen(3000);
