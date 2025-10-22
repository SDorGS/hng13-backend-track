# Backend Wizards – Stage 0 Task: Dynamic Profile API (Node.js / Express)

This repository implements the **Stage 0 Backend Task** — a RESTful API that returns profile information along with a random cat fact fetched from [https://catfact.ninja/fact](https://catfact.ninja/fact).

---

## Quick Start Guide

### 1. Clone the repository

```bash
git clone https://github.com/SDorGS/hng13-backend-track.git
cd hng13-backend-track/stage-0
```

### 2. Install dependencies

```bash
npm install express node-fetch
```

### 3. Run the server

```bash
node me_endpoint.js
```

### 4. Access the endpoint

Visit:

```
http://localhost:3000/me
```

Expected JSON response:

```json
{
  "status": "success",
  "user": {
    "email": "danielsolomongs888@gmail.com",
    "name": "Solomon Daniel Buyikunmi",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-20T12:34:56.789Z",
  "fact": "Cats can rotate their ears 180 degrees."
}
```

---

## Environment Variables

| Variable | Description                        | Default |
| -------- | ---------------------------------- | ------- |
| `PORT`   | Port number for the Express server | `3000`  |

Set manually (macOS / Linux):

```bash
export PORT=3000
```

---

## Tech Stack

* **Node.js / Express** – for building and serving the API
* **node-fetch** – for fetching data from the external Cat Facts API

---

## External API

* [Cat Facts API](https://catfact.ninja/fact)

---

## Author

**Name:** Solomon Daniel Buyikunmi
**Email:** [danielsolomongs888@gmail.com](mailto:danielsolomongs888@gmail.com)
**Stack:** Node.js / Express
**GitHub:** [@SDorGS](https://github.com/SDorGS)

---

## Error Handling

If the Cat Facts API fails or times out, the server responds gracefully:

```json
{
  "status": "error",
  "message": "Failed to fetch cat fact",
  "error": "Request timed out"
}
```

---

## Deployed URL

[https://hng13-backend-track-production.up.railway.app/me](https://hng13-backend-track-production.up.railway.app/me)

---

## How It Works

1. The Express app listens on the configured `PORT`.
2. A GET request to `/me` triggers:

   * Fetch of a random cat fact from `https://catfact.ninja/fact`
   * Creation of a JSON response containing:

     * User info (hard-coded for this task)
     * A dynamic timestamp (UTC ISO 8601)
     * The fetched cat fact
3. If the external API fails or times out, an error JSON is returned instead.

---

## Design Details

| Construct                  | Purpose              | Explanation                                               |
| -------------------------- | -------------------- | --------------------------------------------------------- |
| `try...catch`              | Error containment    | Converts uncertain operations into predictable responses. |
| `Promise.race`             | Timeout handling     | Prevents unbounded waiting for external requests.         |
| `res.json()`               | JSON response format | Ensures `Content-Type: application/json` header.          |
| `new Date().toISOString()` | Timestamp generation | Provides standardized UTC timestamps.                     |

---

## Future Improvements

* Add automated tests (Jest / Mocha)
* Dockerize for consistent deployment
* Implement rate limiting and logging

