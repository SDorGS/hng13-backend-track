const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

const db = new Map(); // in-memory store

const analyze = (str) => {
  const length = str.length;
  const norm = str.toLowerCase();
  const is_palindrome = norm === norm.split('').reverse().join('');
  const unique_characters = new Set(str).size;
  const word_count = str.trim().split(/\s+/).filter(Boolean).length;
  const sha256_hash = crypto.createHash('sha256').update(str).digest('hex');
  const character_frequency_map = {};
  for (const c of str) character_frequency_map[c] = (character_frequency_map[c] || 0) + 1;
  return { length, is_palindrome, unique_characters, word_count, sha256_hash, character_frequency_map };
};

// POST /strings - analyze and store
app.post('/strings', (req, res) => {
  try {
    const { value } = req.body;
    if (value === undefined) return res.status(400).json({ status: "error", message: "Missing 'value' field" });
    if (typeof value !== 'string') return res.status(422).json({ status: "error", message: "'value' must be a string" });

    const p = analyze(value);
    if (db.has(p.sha256_hash)) return res.status(409).json({ status: "error", message: "String already exists" });

    const data = { id: p.sha256_hash, value, properties: p, created_at: new Date().toISOString() };
    db.set(p.sha256_hash, data);
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// GET /strings/:value - get by string
app.get('/strings/:value', (req, res) => {
  const v = req.params.value;
  const h = crypto.createHash('sha256').update(v).digest('hex');
  if (!db.has(h)) return res.status(404).json({ status: "error", message: "String not found" });
  res.json(db.get(h));
});

// GET /strings - list with filters
app.get('/strings', (req, res) => {
  try {
    let data = Array.from(db.values());
    const f = req.query;
    const filters_applied = {};

    if (f.is_palindrome !== undefined) {
      const b = f.is_palindrome === 'true';
      data = data.filter(d => d.properties.is_palindrome === b);
      filters_applied.is_palindrome = b;
    }
    if (f.min_length) {
      const n = parseInt(f.min_length);
      if (isNaN(n)) return res.status(400).json({ status: "error", message: "Invalid min_length" });
      data = data.filter(d => d.properties.length >= n);
      filters_applied.min_length = n;
    }
    if (f.max_length) {
      const n = parseInt(f.max_length);
      if (isNaN(n)) return res.status(400).json({ status: "error", message: "Invalid max_length" });
      data = data.filter(d => d.properties.length <= n);
      filters_applied.max_length = n;
    }
    if (f.word_count) {
      const n = parseInt(f.word_count);
      if (isNaN(n)) return res.status(400).json({ status: "error", message: "Invalid word_count" });
      data = data.filter(d => d.properties.word_count === n);
      filters_applied.word_count = n;
    }
    if (f.contains_character) {
      const c = f.contains_character;
      if (typeof c !== 'string' || c.length !== 1) return res.status(400).json({ status: "error", message: "contains_character must be a single character" });
      data = data.filter(d => d.value.includes(c));
      filters_applied.contains_character = c;
    }

    res.json({ data, count: data.length, filters_applied });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// GET /strings/filter-by-natural-language
app.get('/strings/filter-by-natural-language', (req, res) => {
  try {
    const q = req.query.query;
    if (!q) return res.status(400).json({ status: "error", message: "Missing query parameter" });

    const lq = q.toLowerCase();
    const parsed = {};
    if (lq.includes('palindromic')) parsed.is_palindrome = true;
    if (lq.includes('single word')) parsed.word_count = 1;
    if (lq.match(/longer than (\d+)/)) parsed.min_length = parseInt(lq.match(/longer than (\d+)/)[1]) + 0;
    if (lq.match(/containing the letter ([a-z])/)) parsed.contains_character = lq.match(/containing the letter ([a-z])/)[1];
    if (lq.match(/contain the first vowel/)) parsed.contains_character = 'a';

    if (Object.keys(parsed).length === 0)
      return res.status(400).json({ status: "error", message: "Unable to parse natural language query" });

    let data = Array.from(db.values());
    if (parsed.is_palindrome !== undefined) data = data.filter(d => d.properties.is_palindrome === parsed.is_palindrome);
    if (parsed.word_count) data = data.filter(d => d.properties.word_count === parsed.word_count);
    if (parsed.min_length) data = data.filter(d => d.properties.length > parsed.min_length);
    if (parsed.contains_character) data = data.filter(d => d.value.includes(parsed.contains_character));

    res.json({
      data,
      count: data.length,
      interpreted_query: { original: q, parsed_filters: parsed }
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// DELETE /strings/:value
app.delete('/strings/:value', (req, res) => {
  const v = req.params.value;
  const h = crypto.createHash('sha256').update(v).digest('hex');
  if (!db.has(h)) return res.status(404).json({ status: "error", message: "String not found" });
  db.delete(h);
  res.status(204).send();
});

app.listen(3000);
