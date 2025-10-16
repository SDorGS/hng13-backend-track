
# ‍♂️ Backend Wizards — Stage 0 Task: Build a Dynamic Profile Endpoint

Welcome to **Stage 0!** 
In this task, you'll build a simple RESTful API endpoint that returns your profile information along with a **dynamic cat fact** fetched from an external API.

This task validates your ability to:

* Consume third-party APIs
* Format JSON responses
* Return dynamic data

##  Task — Profile Endpoint (Core Requirements)

###  Required Endpoint

Create a **GET** endpoint at:

```
/me
```

###  Expected Behavior

* Must return JSON data with the header:

  ```
  Content-Type: application/json
  ```
* Must integrate with the **Cat Facts API** to fetch a random cat fact dynamically.



##  Response Structure (Required Fields)

Your endpoint **must** return a JSON response **exactly** in the following format:

```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>"
}
```

###  Field Specifications

| Field          | Description                                                                              |
| -- | - |
| **status**     | Must always be the string `"success"`                                                    |
| **user.email** | Your personal email address                                                              |
| **user.name**  | Your full name                                                                           |
| **user.stack** | Your backend technology stack (e.g., `"Node.js/Express"`, `"Python/Django"`, `"Go/Gin"`) |
| **timestamp**  | Current UTC time in ISO 8601 format (e.g., `"2025-10-15T12:34:56.789Z"`)                 |
| **fact**       | A random cat fact fetched from the Cat Facts API                                         |



##  Dynamic Timestamp

* Must reflect the **current UTC time** at the moment of the request
* Use **ISO 8601** format
* The timestamp should update **on every new request**



##  Cat Facts API Integration

**API Endpoint:**

```
https://catfact.ninja/fact
```

### Requirements:

* Fetch a **new cat fact** on every `/me` request
* Handle API failures gracefully
* Use appropriate **timeout** values for external requests



## ⚠️ Error Handling

If the Cat Facts API fails:

* Return a **fallback message** or a **structured error response**
* Handle **network errors** and **timeouts**
* Return **appropriate HTTP status codes**



##  Best Practices

* Use **environment variables** for configuration
* Include proper **CORS headers** if needed
* Add **basic logging** for debugging
* Consider **rate limiting** if deploying publicly



##  Acceptance Criteria (Checklist)

* [ ] Working `GET /me` endpoint accessible and returns **200 OK**
* [ ] Response structure **strictly follows** the defined JSON schema
* [ ] All required fields (`status`, `user`, `timestamp`, `fact`) are present
* [ ] `user` object includes valid `email`, `name`, and `stack` strings
* [ ] `timestamp` returns the current **UTC** time in **ISO 8601** format
* [ ] `timestamp` updates dynamically per request
* [ ] `fact` field contains a **random cat fact** fetched dynamically
* [ ] Response has header `Content-Type: application/json`
* [ ] Code follows **best practices** for your chosen backend stack



##  Submission Instructions

You can implement this task in **any language** (e.g., Fortran, C, Assembly — anything!).

**Important:**

>  Vercel and Render are **forbidden** for this cohort.
>  Accepted platforms: **Railway, Heroku, AWS, PXXL App**, etc.

Your **GitHub repository** must include:

* A **clear README** with setup instructions
* **Instructions to run locally**
* **List of dependencies** and installation steps
* **Environment variables** (if any)
* **Tests**, documentation, or notes (optional but encouraged)

###  Test Before Submission

Ensure:

* Your endpoint returns the **correct response format**
* The cat fact is **dynamic**
* The server is **accessible publicly**



## ️ Documentation & Social Task

Create a **rich post** on **LinkedIn**, **Dev.to**, **Hashnode**, **Medium**, or **X (Twitter)** detailing:

* Your **work process**
* **What you learned**
* Supporting **snapshots**, **images**, or **videos**



##  Submission Process

In Slack:

1. Verify your server works (test from multiple networks if possible)

2. Go to the **#track-backend** channel

3. Run the command:

   ```
   /stage-zero-backend
   ```

4. Submit the following:

   * Your server IP (e.g., `http://your-ip-address/me`)
   * GitHub repo link
   * Full name
   * Email
   * Stack

5. Check **Thanos bot** for feedback — it will display an **error** or **success** message after submission.



## ️ Deadline

> **Submission Deadline:**
>  **Sunday, 19 Oct 2025 (GMT+1 / WAT)**


