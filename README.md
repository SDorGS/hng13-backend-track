# String Analyzer Service

A RESTful API for Stage 1 that analyzes strings and stores their computed properties.

## Live API URL

Base URL: [https://hng13-backend-track-production.up.railway.app](https://hng13-backend-track-production.up.railway.app)
Example endpoint: GET [https://hng13-backend-track-production.up.railway.app/me](https://hng13-backend-track-production.up.railway.app/me)

## Features

For each analyzed string the API computes and stores:

* `length`: number of characters
* `is_palindrome`: whether the string reads the same forwards and backwards (case-insensitive)
* `unique_characters`: count of distinct characters
* `word_count`: number of whitespace-separated words
* `sha256_hash`: SHA-256 hash for unique id
* `character_frequency_map`: map of character -> occurrence count

All data is stored in-memory (Map).

## Endpoints

### POST /strings

Create and analyze a string.

Request body (application/json)

```json
{ "value": "string to analyze" }
```

201 Created (example)

```json
{
  "id": "sha256_hash_value",
  "value": "string to analyze",
  "properties": {
    "length": 17,
    "is_palindrome": false,
    "unique_characters": 12,
    "word_count": 3,
    "sha256_hash": "abc123...",
    "character_frequency_map": { "s": 2, "t": 3, "r": 2 }
  },
  "created_at": "2025-08-27T10:00:00Z"
}
```

Errors:

* 400 Bad Request: missing `value` field
* 422 Unprocessable Entity: `value` is not a string
* 409 Conflict: string already exists

---

### GET /strings/{string_value}

Get an analyzed string by original value.

200 OK returns the same object as POST.
404 Not Found if missing.

---

### GET /strings

List all analyzed strings with optional filters:

Query params:

* `is_palindrome` (true/false)
* `min_length` (integer)
* `max_length` (integer)
* `word_count` (integer)
* `contains_character` (single character string)

Response (200)

```json
{
  "data": [ /* array of stored objects */ ],
  "count": 15,
  "filters_applied": { /* echo of applied filters */ }
}
```

Errors:

* 400 Bad Request: invalid query values/types

---

### GET /strings/filter-by-natural-language

Filter using simple natural language queries via `query` param.

Example:

```
/strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings
```

Response (200)

```json
{
  "data": [ /* matches */ ],
  "count": 3,
  "interpreted_query": {
    "original": "all single word palindromic strings",
    "parsed_filters": { "word_count": 1, "is_palindrome": true }
  }
}
```

Errors:

* 400 Bad Request: unable to parse query
* 422 Unprocessable Entity: parsed filters conflict

Notes: parser uses simple heuristics (single word, palindromic, longer than N, contains letter X, first vowel -> 'a').

---

### DELETE /strings/{string_value}

Delete stored string.

Success: 204 No Content
Error: 404 Not Found

---

## Project structure

```
stage-1/
├── server.js         # main Express app
├── package.json
├── package-lock.json
├── README.md         # this file
└── Task.md           # original task (optional)
```

## Dependencies

* node (v16+ recommended)
* express

Install with:

```bash
npm install
```

## Run locally

```bash
node server.js
```

By default the app listens on port 3000. To use an env port:

```js
app.listen(process.env.PORT || 3000);
```

## Example curl commands

Create:

```bash
curl -X POST "http://localhost:3000/strings" \
  -H "Content-Type: application/json" \
  -d '{"value":"madam"}'
```

Get one:

```bash
curl "http://localhost:3000/strings/madam"
```

List with filters:

```bash
curl "http://localhost:3000/strings?is_palindrome=true&min_length=1"
```

Natural-language filter:

```bash
curl "http://localhost:3000/strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings"
```

Delete:

```bash
curl -X DELETE "http://localhost:3000/strings/madam"
```

## Deployment

Hosted on Railway: [https://hng13-backend-track-production.up.railway.app](https://hng13-backend-track-production.up.railway.app)

Do not use Vercel or Render for this cohort.

## Submission

Submit via `/stage-one-backend` in the `stage-1-backend` Slack channel with:

* API base URL ([https://hng13-backend-track-production.up.railway.app](https://hng13-backend-track-production.up.railway.app))
* GitHub repo link
* Full name
* Email
* Stack (Node.js / Express)

## Author

Name: Solomon Daniel Buyikunmi
Email: [danielsolomongs888@gmail.com](mailto:danielsolomongs888@gmail.com)
Stack: Node.js / Express
