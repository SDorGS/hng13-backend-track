const express = require('express');
const app = express();

app.get('/me', (req, res) => res.send('ok'));

app.listen(3000);
