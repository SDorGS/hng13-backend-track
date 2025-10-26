const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// In-memory database
const db = new Map();

// Helper function to analyze strings
const analyze = (str) => {
  const length = str.length;
  const norm = str.toLowerCase();
  const is_palindrome = norm === norm.split('').reverse().join('');
  const unique_characters = new Set(str).size;
  const word_count = str.trim().split(/\s+/).filter(Boolean).length;
  const sha256_hash = crypto.createHash('sha256').update(str).digest('hex');
  const character_frequency_map = {};

  for (const c of str) {
    character_frequency_map[c] = (character_frequency_map[c] || 0) + 1;
  }

  return {
    length,
    is_palindrome,
    unique_characters,
    word_count,
    sha256_hash,
    character_frequency_map,
  };
};

// ✅ Root route — required for health checks
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'String Analyzer API is running 🚀',
  });
});

// ✅ POST /strings
app.post('/strings', (req, res) => {
  const { value } = req.body;

  if (value === undefined)
    return res.status(400).json({ error: "Missing 'value' field" });
  if (typeof value !== 'string')
    return res.status(422).json({ error: "'value' must be a string" });

  const props = analyze(value);

  if (db.has(props.sha256_hash))
    return res.status(409).json({ error: 'String already exists' });

  const data = {
    id: props.sha256_hash,
    value,
    properties: props,
    created_at: new Date().toISOString(),
  };

  db.set(props.sha256_hash, data);
  res.status(201).json(data);
});

// ✅ GET /strings/:value
app.get('/strings/:value', (req, res) => {
  const hash = crypto.createHash('sha256').update(req.params.value).digest('hex');

  if (!db.has(hash))
    return res.status(404).json({ error: 'String not found' });

  res.status(200).json(db.get(hash));
});

// ✅ GET /strings (with filters)
app.get('/strings', (req, res) => {
  let data = Array.from(db.values());
  const filters = req.query;
  const filters_applied = {};

  try {
    if (filters.is_palindrome !== undefined) {
      const boolVal = filters.is_palindrome === 'true';
      data = data.filter(d => d.properties.is_palindrome === boolVal);
      filters_applied.is_palindrome = boolVal;
    }

    if (filters.min_length) {
      const n = parseInt(filters.min_length);
      if (isNaN(n)) return res.status(400).json({ error: 'Invalid min_length' });
      data = data.filter(d => d.properties.length >= n);
      filters_applied.min_length = n;
    }

    if (filters.max_length) {
      const n = parseInt(filters.max_length);
      if (isNaN(n)) return res.status(400).json({ error: 'Invalid max_length' });
      data = data.filter(d => d.properties.length <= n);
      filters_applied.max_length = n;
    }

    if (filters.word_count) {
      const n = parseInt(filters.word_count);
      if (isNaN(n)) return res.status(400).json({ error: 'Invalid word_count' });
      data = data.filter(d => d.properties.word_count === n);
      filters_applied.word_count = n;
    }

    if (filters.contains_character) {
      const c = filters.contains_character;
      if (typeof c !== 'string' || c.length !== 1)
        return res.status(400).json({ error: 'contains_character must be a single character' });
      data = data.filter(d => d.value.includes(c));
      filters_applied.contains_character = c;
    }

    res.status(200).json({ data, count: data.length, filters_applied });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET /strings/filter-by-natural-language
app.get('/strings/filter-by-natural-language', (req, res) => {
  const q = req.query.query;
  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  const lq = q.toLowerCase();
  const parsed = {};

  if (lq.includes('palindromic')) parsed.is_palindrome = true;
  if (lq.includes('single word')) parsed.word_count = 1;

  const longerMatch = lq.match(/longer than (\d+)/);
  if (longerMatch) parsed.min_length = parseInt(longerMatch[1]);

  const letterMatch = lq.match(/containing the letter ([a-z])/);
  if (letterMatch) parsed.contains_character = letterMatch[1];

  if (lq.includes('contain the first vowel'))
    parsed.contains_character = 'a';

  if (Object.keys(parsed).length === 0)
    return res.status(400).json({ error: 'Unable to parse natural language query' });

  let data = Array.from(db.values());
  if (parsed.is_palindrome !== undefined)
    data = data.filter(d => d.properties.is_palindrome === parsed.is_palindrome);
  if (parsed.word_count)
    data = data.filter(d => d.properties.word_count === parsed.word_count);
  if (parsed.min_length)
    data = data.filter(d => d.properties.length > parsed.min_length);
  if (parsed.contains_character)
    data = data.filter(d => d.value.includes(parsed.contains_character));

  res.status(200).json({
    data,
    count: data.length,
    interpreted_query: { original: q, parsed_filters: parsed },
  });
});

// ✅ DELETE /strings/:value
app.delete('/strings/:value', (req, res) => {
  const hash = crypto.createHash('sha256').update(req.params.value).digest('hex');
  if (!db.has(hash))
    return res.status(404).json({ error: 'String not found' });

  db.delete(hash);
  res.status(204).send();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
