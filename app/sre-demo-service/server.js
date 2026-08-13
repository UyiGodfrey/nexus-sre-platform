const express = require("express");
const client = require("prom-client");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// Prometheus registry
// --------------------------------------------------

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

// --------------------------------------------------
// HTTP metrics
// --------------------------------------------------

const httpRequestsTotal = new client.Counter({
  name: "nexus_http_requests_total",
  help: "Total number of HTTP requests received.",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpErrorsTotal = new client.Counter({
  name: "nexus_http_errors_total",
  help: "Total number of HTTP service errors.",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: "nexus_http_request_duration_seconds",
  help: "HTTP request duration in seconds.",
  labelNames: ["method", "route"],
  buckets: [0.05, 0.1, 0.25, 0.5, 0.75, 1, 2, 5],
  registers: [register],
});

// --------------------------------------------------
// Business metrics
// --------------------------------------------------

const ordersTotal = new client.Counter({
  name: "nexus_orders_total",
  help: "Total number of successfully created orders.",
  registers: [register],
});

const paymentsTotal = new client.Counter({
  name: "nexus_payments_total",
  help: "Total number of payment attempts.",
  registers: [register],
});

const paymentFailuresTotal = new client.Counter({
  name: "nexus_payment_failures_total",
  help: "Total number of failed payment attempts.",
  registers: [register],
});

// --------------------------------------------------
// HTTP instrumentation middleware
// --------------------------------------------------

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration =
      Number(process.hrtime.bigint() - start) / 1_000_000_000;

    const route = req.route?.path || req.path;
    const statusCode = String(res.statusCode);

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
      },
      duration
    );

    if (res.statusCode >= 500) {
      httpErrorsTotal.inc({
        method: req.method,
        route,
        status_code: statusCode,
      });
    }
  });

  next();
});

// --------------------------------------------------
// Health endpoint
// --------------------------------------------------

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

// --------------------------------------------------
// Product endpoint
// --------------------------------------------------

app.get("/products", (req, res) => {
  res.status(200).json({
    products: [
      {
        id: 1,
        name: "Laptop",
        price: 1200,
      },
      {
        id: 2,
        name: "Keyboard",
        price: 80,
      },
    ],
  });
});

// --------------------------------------------------
// Order endpoint
// --------------------------------------------------

app.post("/orders", (req, res) => {
  ordersTotal.inc();

  res.status(201).json({
    message: "Order created",
  });
});

// --------------------------------------------------
// Payment endpoint
// --------------------------------------------------

app.post("/payments", (req, res) => {
  paymentsTotal.inc();

  const failed = req.body?.simulateFailure === true;

  if (failed) {
    paymentFailuresTotal.inc();

    return res.status(500).json({
      message: "Payment failed",
    });
  }

  res.status(200).json({
    message: "Payment successful",
  });
});

// --------------------------------------------------
// Prometheus metrics endpoint
// --------------------------------------------------

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

// --------------------------------------------------
// Server
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(`Nexus SRE service listening on port ${PORT}`);
});