# 🚀 Partner API Integration Hub

An **enterprise-style backend project** that simulates how external partners integrate with internal platforms using secure, well-defined APIs.

This project is designed to showcase **product thinking, API lifecycle management, partner onboarding, and workflow clarity** — not just coding.

---

## 📌 Why This Project Matters

In real-world enterprises (SaaS, fintech, health-tech, marketplaces):
- External partners consume APIs
- Access must be **controlled**
- Requests must be **traceable**
- Failures must be **observable**
- Systems must enforce **clear contracts**



---

## 🧠 What This Project Demonstrates

- Partner onboarding & API key issuance  
- API-key based authentication (external trust model)  
- Clean REST API contracts  
- Request submission & lifecycle tracking  
- Status-based workflows  
- Design choices aligned with **product + operations** thinking  

---

## 🏗️ High-Level Architecture

```
Partner Client (Postman / App)
        |
        |  x-api-key
        v
Partner API Integration Hub
        |
        |-- Partner Validation
        |-- Request Creation
        |-- Status Tracking
        |
 In-memory Store (for demo clarity)
```

> Note: In-memory storage is intentional to keep focus on **API behavior and workflows** rather than infrastructure setup.

---

## 🔐 Authentication Model

### Why API Keys?
- External partners cannot be trusted like internal users
- Simple onboarding & rotation
- Easy rate-limiting & monitoring
- Common in real partner integrations

Each partner receives:
- `partnerId`
- `apiKey`

All partner APIs require:

```
x-api-key: <partner-api-key>
```

---

## 🔄 Request Lifecycle

```
SUBMITTED → (future: PROCESSING) → COMPLETED / FAILED
```

Each request:
- Is tied to a partner
- Has a unique request ID
- Can be queried independently for status

This mirrors **real async enterprise workflows**.

---

## 🌐 API Endpoints

### 🔹 Admin (Simulated)

**Create Partner**
```
POST /admin/partners
{
  "name": "Demo Partner"
}
```

Response:
```
{
  "id": "...",
  "name": "Demo Partner",
  "apiKey": "..."
}
```

---

### 🔹 Partner APIs (Authenticated)

**Submit Request**
```
POST /api/requests
Headers:
x-api-key: <apiKey>

Body:
{
  "type": "ONBOARDING",
  "payload": "sample data"
}
```

**Fetch Request Status**
```
GET /api/requests/{requestId}
Headers:
x-api-key: <apiKey>
```

---

## ▶️ How to Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

Server runs at:
```
http://localhost:8081
```

---

## 🧪 How to Test (Postman / Curl)

1. Create partner → copy API key  
2. Call partner APIs using `x-api-key`  
3. Submit request  
4. Fetch request status  

This mimics **real partner onboarding and integration testing**.

---

## 📊 Observability & Extensions

This project is intentionally extensible:

- Rate limiting per partner
- SLA enforcement
- Request retries & idempotency
- Metrics (latency, failures, usage)
- Audit logs for compliance

These are **product decisions**, not just engineering ones.

---

## 🎤 Interview Talking Points

Use these confidently:

- Why API keys for partners vs JWT for users  
- Why workflows & statuses matter in enterprise systems  
- How this scales with rate limits & SLAs  
- How product teams use API metrics to make decisions  
- How onboarding friction affects partner success  

---

## 🧩 Why In-Memory Storage?

For interviews:
- Keeps focus on **design & behavior**
- Removes setup friction
- Makes flows easy to explain

In production:
- Replace with DB / cache / queue (trivial swap)

---

## 🎯 Who This Project Is For

- Product / Tech-Product roles  
- Business Systems / Integration roles  
- Platform & Partner Engineering roles  
- IT / Operations-facing teams  

---

## 📜 License

MIT
