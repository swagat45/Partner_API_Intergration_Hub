require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * In-memory stores (intentional for interview clarity)
 */
const partners = [];
const requests = [];

/**
 * Admin endpoint: onboard a partner
 */
app.post("/admin/partners", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Partner name required" });

  const partner = {
    id: uuid(),
    name,
    apiKey: uuid(),
    createdAt: new Date()
  };

  partners.push(partner);
  res.json(partner);
});

/**
 * API Key authentication middleware
 */
app.use("/api", (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const partner = partners.find(p => p.apiKey === apiKey);

  if (!partner) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  req.partner = partner;
  next();
});

/**
 * Partner submits a request
 */
app.post("/api/requests", (req, res) => {
  const request = {
    id: uuid(),
    partnerId: req.partner.id,
    payload: req.body,
    status: "SUBMITTED",
    createdAt: new Date()
  };

  requests.push(request);
  res.json(request);
});

/**
 * Partner fetches request status
 */
app.get("/api/requests/:id", (req, res) => {
  const request = requests.find(r => r.id === req.params.id);
  if (!request) return res.status(404).json({ error: "Request not found" });

  res.json(request);
});

app.listen(process.env.PORT || 8081, () => {
  console.log("Partner API Integration Hub running");
});
