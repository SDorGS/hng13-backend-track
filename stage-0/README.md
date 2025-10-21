
# Backend Wizards — Stage 0 Task: Dynamic Profile API (Node.js / Express)

This repository implements the **Stage 0 Backend Task**:  
a RESTful API that returns profile information and a random cat fact from [https://catfact.ninja/fact](https://catfact.ninja/fact).

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

You should see a response like:

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

## ⚙️ Environment Variables

| Variable | Description                        | Default |
| -------- | ---------------------------------- | ------- |
| `PORT`   | Port number for the Express server | `3000`  |

To set manually:

```bash
export PORT=3000
```

## Tech Stack

* **Node.js / Express**
* **node-fetch** for external API calls

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

If the Cat Facts API fails or times out, the endpoint responds gracefully:

```json
{
  "status": "error",
  "message": "Failed to fetch cat fact",
  "error": "Request timed out"
}
```

---

## Example Deployed URL

[https://hng13-backend-track-production.up.railway.app/me](https://hng13-backend-track-production.up.railway.app/me)




# Full Breakdown


# The Cat Facts API Integration (Node.js / Express)

## The Possibility of a Server

A **server**, at its most elemental level, is not a physical entity but a *pattern of behavior*:
A system that **listens** for requests, **processes** those requests according to defined rules, and **returns** responses.

This concept rests on a fundamental principle of computation:

> A machine can react to symbolic input by executing deterministic or conditional operations.

That principle itself depends on even deeper postulates:

1. **Determinism of Instructions:** When I give a program a specific sequence of instructions, I assume the same inputs always produce the same outputs (unless explicitly randomized).
2. **Continuity of Interaction:** There exists a communication channel (in this case, the web) through which structured data (HTTP requests and responses) can be sent and received.
3. **Representation of Meaning Through Symbols:** Text such as `"GET /me"` or JSON structures are mere encodings that humans and machines have agreed to interpret in consistent ways.

Thus, when I say *“I am building an Express server,”* I am actually saying:

> I am constructing a linguistic structure in Node.js that formalizes a behavioral pattern:
> *Wait for an HTTP request → interpret → perform logic → send a response.*

Every other detail — installing packages, choosing ports, writing code — is an instantiation of this idea in concrete form.

## To Implementation

The task demands specific operational behaviors, yet those behaviors exist only because of the ontological principles just established.

To connect these two domains, I must translate *the possibility* of a listening system (Logic 1) into *a physical process* that my computer executes (Logic 2).

That requires me to identify **what resources I can manipulate** and **what representations I must use**.

In the world of JavaScript (specifically Node.js):

* My **computational substrate** is the Node runtime.
* My **communication layer** is the built-in HTTP networking stack.
* My **abstraction toolkit** is Express.js, which gives human-friendly functions for defining routes.

Once I understand that, I see that creating a “route” like `/me` is nothing more than *registering a behavior* to be invoked when a specific kind of message arrives.

Thus, the philosophical “server” becomes a tangible set of steps.

## Operational Layer: Building and Using the System

Having satisfied the metaphysical and transitional reasoning, I can now specify the exact implementation details that bring this conceptual machine to life.

### 1. Purpose

The program exposes a single HTTP endpoint (`/me`) that, when visited, replies with:

* User information (hard-coded for demonstration)
* A timestamp (generated at runtime)
* A random cat fact retrieved from [https://catfact.ninja/fact](https://catfact.ninja/fact)

It also manages timeouts and API failures gracefully.

### 2. Requirements

To *exist materially*, this server needs:

* **Node.js (v14 or higher)** — the interpreter that can execute JavaScript outside a browser.
* **npm** — Node’s package manager, which handles the acquisition of external libraries.

### 3. Dependencies

Every concept used in the program corresponds to a specific dependency:

| Package      | Why It Exists                                                                | What It Provides                                                               |
| ------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `express`    | Abstracts raw HTTP handling into human-readable routing logic.               | Functions like `express()` and `app.get()` that manage requests and responses. |
| `node-fetch` | Allows this program to make HTTP requests to external APIs from within Node. | The `fetch()` function, mirroring the browser’s native `fetch`.                |

### 4. Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SDorGS/hng13-backend-track.git
   cd hng13-backend-track/stage-0
   ```

2. **Install dependencies**

   ```bash
   npm install express node-fetch
   ```

### 5. Environment Variables

Every runtime configuration parameter should be adjustable without changing the source code.
Here we use one variable:

| Variable | Meaning                                           | Default |
| -------- | ------------------------------------------------- | ------- |
| `PORT`   | Defines which network port the server listens on. | `3000`  |

```bash
export PORT=3000
```

### 6. Running the Program

Run:

```bash
node index.js
```

The Node runtime reads the file, executes each line, and:

1. Loads the `express` and `node-fetch` libraries.
2. Instantiates an application object (`const app = express();`).
3. Defines one route (`/me`) using `app.get()`.
4. Starts listening on the port defined by `process.env.PORT || 3000`.

You can then visit:
```
[https://hng13-backend-track-production.up.railway.app/me](https://hng13-backend-track-production.up.railway.app/me)
```

### 7. How the `/me` Endpoint Works

1. **Timeout Construct:**
   A promise is created that automatically rejects after 5 seconds if the external API takes too long.

2. **Fetch Operation:**
   `fetch('https://catfact.ninja/fact')` requests a random cat fact.
   `Promise.race([fetch, timeout])` ensures that whichever completes first determines the result.

3. **Error Handling:**
   If the response is not OK, or if the timeout fires, the `catch` block runs, returning a JSON error object.

4. **Response Construction:**
   On success, the server sends a structured JSON object with the `user`, current `timestamp`, and the cat `fact`.

### 8. Example Outputs

**Successful Response:**

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

**Error Response:**

```json
{
  "status": "error",
  "message": "Failed to fetch cat fact",
  "error": "Request timed out"
}
```

### 9. Design Rationale

| Construct                  | Foundational Need     | Explanation                                                     |
| -------------------------- | --------------------- | --------------------------------------------------------------- |
| `try...catch`              | Error containment     | Converts uncertain operations into predictable responses.       |
| `Promise.race`             | Temporal boundedness  | Enforces finite wait time for external requests.                |
| `res.json()`               | Semantic precision    | Ensures outputs conform to structured, machine-readable format. |
| `new Date().toISOString()` | Temporal traceability | Allows systems to know *when* the fact was retrieved.           |

### 10. Notes on Extension and Deployment

* **CORS** support (optional)

  ```js
  const cors = require('cors');
  app.use(cors());
  ```
* **Logging:** via `morgan`
* **Rate Limiting:** via `express-rate-limit`

### 11. Testing and Future Work

* Automated testing with Jest/Mocha
* Dockerization for reproducibility
* Additional endpoints demonstrating concurrency patterns
