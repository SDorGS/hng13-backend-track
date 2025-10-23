# String Analyzer Service

A RESTful API built for **Backend Wizards — Stage 1**, that analyzes strings and stores their computed properties.

---

## Features

For each analyzed string, the API computes and stores:

* `length`: number of characters
* `is_palindrome`: whether the string reads the same forwards and backwards (case-insensitive)
* `unique_characters`: count of distinct characters
* `word_count`: number of whitespace-separated words
* `sha256_hash`: SHA-256 hash of the string (unique identifier)
* `character_frequency_map`: object showing how many times each character occurs

---

## Endpoints

### POST /strings

Analyze and store a new string.

**Body**

```json
{ "value": "string to analyze" }
```

**201 Created**

```json
{
  "id": "sha256_hash",
  "value": "string to analyze",
  "properties": {
    "length": 17,
    "is_palindrome": false,
    "unique_characters": 12,
    "word_count": 3,
    "sha256_hash": "abc123...",
    "character_frequency_map": { "a": 2, "b": 1 }
  },
  "created_at": "2025-08-27T10:00:00Z"
}
```

Errors:
`400` Bad Request | `409` Conflict | `422` Unprocessable Entity

---

### GET /strings/{string_value}

Return one analyzed string.
Errors: `404` Not Found

---

### GET /strings

List all analyzed strings with optional filters:

`is_palindrome`, `min_length`, `max_length`, `word_count`, `contains_character`

**Example**

```
/strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a
```

Errors: `400` Bad Request

---

### GET /strings/filter-by-natural-language

Filter using plain-English queries.

**Example**

```
/strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings
```

Supported phrases include:

* “single word palindromic strings”
* “strings longer than 10 characters”
* “strings containing the letter z”

Errors: `400` Bad Request | `422` Unprocessable Entity

---

### DELETE /strings/{string_value}

Delete a stored string.
**204 No Content** on success.
Error: `404` Not Found

---

## Setup

```bash
git clone https://github.com/SDorGS/hng13-backend-track.git
cd hng13-backend-track/stage-1
npm install
node server.js
```

The server starts on **[http://localhost:3000](http://localhost:3000)**

To change the port:

```js
app.listen(process.env.PORT || 3000);
```

---

## Deployment

Host on Railway, PXXL App, AWS, or Heroku.
Do **not** use Vercel or Render.

---

## Author

**Name:** Solomon Daniel Buyikunmi
**Email:** [danielsolomongs888@gmail.com](mailto:danielsolomongs888@gmail.com)
**Stack:** Node.js / Express
