# Building a RESTful API

## 1. REST APIs and the Richardson Maturity Model (RMM)

REST APIs are **Representational State Transfer** — a style for designing networked applications, like the **Richardson Maturity Model (RMM)**.

This model categorizes RESTful services into **4 levels (0–3)**, showing how closely an API adheres to REST principles.

### Levels of RESTfulness

**Level 0:** Single URI (e.g., `POST` to `/api/doEverything`)
**Level 1:** Resources (use of multiple URIs like `/users`, `/orders`)
**Level 2:** HTTP Verbs (`GET`, `POST`, `PUT`, `DELETE` used appropriately)
**Level 3:** HATEOAS (Hypermedia as the Engine of Application State)

| Level | REST Feature                  | Description                            |
| ----- | ----------------------------- | -------------------------------------- |
| 0     | Single Endpoint               | All actions through one URI            |
| 1     | Resources                     | Expose multiple URIs (resource-based)  |
| 2     | HTTP Methods                  | Uses GET/POST/PUT/DELETE appropriately |
| 3     | Hypermedia Controls (HATEOAS) | API guides client using links          |

**Think of it as a staircase:** the higher the level, the more RESTful the API is.

### REST Analogy: The Museum

* **Museum = Server**
* **Rooms = Resources** (like `/paintings`, `/sculptures`)
* **Signs = Hypermedia links guiding you**
* **Actions like "look", "buy souvenir" = HTTP methods (`GET`, `POST`)**

In a truly RESTful museum:

* You don’t ask staff for every detail (like Level 0).
* You follow signs (URIs and HATEOAS) to explore.
* You use standard behavior (e.g., “Look = GET”).

## 2. Python Example: Using Flask Decorators

Python uses **decorator wrappers** to define RESTful routes:

```python
@app.route('/users', methods=['POST'])
def create_user():
    return "User created!"

@app.route('/orders', methods=['POST'])
def create_order():
    return "Order created!"
```

**Rule:** One HTTP method per path.
In Flask, each path–method pair maps to one function (e.g., `/users` + `POST` → `create_user()`).


# **Case Study: A Guided Exploration of REST APIs**

### Concept Mapping

* **Client (You):** A visitor exploring a digital museum
* **Server (Me):** The museum backend responding to your actions
* **Resources (Rooms):** `/paintings`, `/sculptures`, `/giftshop`, etc.
* **Actions (HTTP Methods):** `GET`, `POST`
* **Hypermedia (HATEOAS):** Embedded links guiding next steps


## Step 1: Entering the Museum Lobby

You walk in and see a directory of rooms (resources):

```http
GET /paintings
```

**Server Response:**

```json
[
  {
    "id": 1,
    "title": "Starry Night",
    "artist": "Vincent van Gogh",
    "link": "/paintings/1"
  },
  {
    "id": 2,
    "title": "Mona Lisa",
    "artist": "Leonardo da Vinci",
    "link": "/paintings/2"
  }
]
```

**Result:** You see a list of paintings and links to explore more.


## Step 2: Exploring a Specific Painting

You choose to explore *Starry Night*:

```http
GET /paintings/1
```

**Server Response:**

```json
{
  "id": 1,
  "title": "Starry Night",
  "artist": "Vincent van Gogh",
  "year": 1889,
  "description": "A swirling night sky over a quiet town...",
  "availableForPurchase": true,
  "actions": {
    "buyPrint": "/giftshop/order/1",
    "viewArtist": "/artists/van-gogh"
  }
}
```

**Result:** Detailed info, plus HATEOAS links to buy a print or learn about the artist.

## Step 3: Learning About the Artist

You want to know more about Van Gogh:

```http
GET /artists/van-gogh
```

**Server Response:**

```json
{
  "name": "Vincent van Gogh",
  "birthYear": 1853,
  "deathYear": 1890,
  "nationality": "Dutch",
  "notableWorks": [
    {
      "title": "Starry Night",
      "link": "/paintings/1"
    },
    {
      "title": "Sunflowers",
      "link": "/paintings/3"
    }
  ],
  "relatedArtists": [
    {
      "name": "Paul Gauguin",
      "link": "/artists/paul-gauguin"
    }
  ]
}
```

**Result:** Van Gogh's biography, notable works, and a related artist (hypermedia).

## Step 4: Purchasing a Print

You're ready to buy a *Starry Night* print:

```http
POST /giftshop/order/1
```

**Request Body:**

```json
{
  "item": "Starry Night Print",
  "size": "Medium",
  "quantity": 1,
  "shippingAddress": "42 RESTful Lane, API City, 12345"
}
```

**Server Response:**

```json
{
  "orderId": "ORD-98765",
  "status": "Confirmed",
  "estimatedDelivery": "2025-10-22",
  "links": {
    "trackOrder": "/giftshop/order/ORD-98765",
    "viewMorePrints": "/giftshop/prints"
  }
}
```

**Result:** Order confirmed! You're given more links to track or browse.

## Step 5: Tracking the Order

You want to track your shipment:

```http
GET /giftshop/order/ORD-98765
```

**Server Response:**

```json
{
  "orderId": "ORD-98765",
  "item": "Starry Night Print",
  "status": "Shipped",
  "shippedOn": "2025-10-16",
  "estimatedDelivery": "2025-10-22",
  "trackingInfo": {
    "carrier": "ArtExpress",
    "trackingNumber": "AE123456789",
    "link": "https://artexpress.com/track/AE123456789"
  },
  "links": {
    "leaveReview": "/reviews/ORD-98765",
    "viewMorePaintings": "/paintings"
  }
}
```

**Result:** Order shipped! You can now track, review, or browse more.

## 3. The Thing About REST

* REST works best for **stateless**, **client-server** web services.
* Assumes **resource-oriented design** (nouns, not verbs).
* Clients and servers are **decoupled** and communicate via **standard HTTP**.
* REST does **not enforce strict API rules** — interpretation varies.
* **HATEOAS (Level 3)** is **rarely fully implemented** in real-world APIs.
* Less suitable for **real-time applications** (e.g., chats), where **WebSockets** might be better.

