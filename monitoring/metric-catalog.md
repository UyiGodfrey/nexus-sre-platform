# Nexus Shop — Metric Catalog

## 1. Purpose

This document defines the initial metrics required to support
Nexus Shop SRE objectives, including SLI measurement,
performance analysis, incident investigation, and capacity
planning.

## 2. Metric Design Principles

Metrics should:

- Have a clear operational purpose
- Support defined SLIs where applicable
- Use appropriate metric types
- Avoid unnecessary cardinality
- Use stable and meaningful labels
- Support reliable aggregation
- Avoid exposing sensitive information

## 3. HTTP Request Metrics

### nexus_http_requests_total

**Type:** Counter

**Purpose:**  
Counts HTTP requests received by a service.

**Initial labels:**

- service
- method
- route
- status_code

---

### nexus_http_errors_total

**Type:** Counter

**Purpose:**  
Counts service-level HTTP errors.

**Initial labels:**

- service
- method
- route
- status_code

The application must define which responses represent
service failures versus expected client or business errors.

---

### nexus_http_request_duration_seconds

**Type:** Histogram

**Purpose:**  
Measures HTTP request duration.

**Initial labels:**

- service
- method
- route

The histogram will support latency analysis and latency-based
SLO calculations.

## 4. Business Metrics

### nexus_orders_total

**Type:** Counter

**Purpose:**  
Counts order operations or successfully created orders,
depending on the final instrumentation definition.

---

### nexus_payments_total

**Type:** Counter

**Purpose:**  
Counts payment operations.

---

### nexus_payment_failures_total

**Type:** Counter

**Purpose:**  
Counts payment failures.

This metric will support investigation of payment reliability
and the complete-purchase user journey.

## 5. Resource Metrics

The system may expose supporting resource metrics such as:

- CPU utilization
- Memory utilization
- Disk utilization
- Database connections
- Queue depth
- Active connections

These metrics support capacity, saturation, and incident
analysis.

Resource metrics are not automatically considered user-facing
SLIs.

## 6. Metric Types

### Counter

Used for cumulative events that increase over time.

Examples:

- HTTP requests
- Errors
- Orders
- Payments

### Gauge

Used for values representing current state.

Examples:

- Active connections
- Queue depth
- Current replicas
- Memory utilization

### Histogram

Used for distributions of observed values.

Examples:

- Request duration
- Database query duration
- Response size

### Summary

May be used where application-local quantile calculation is
specifically required, but histograms are preferred for the
initial Nexus observability design.

## 7. Cardinality Policy

Metrics must avoid unnecessary high-cardinality labels.

The following should not normally be metric labels:

- user ID
- request ID
- trace ID
- order ID
- transaction ID
- email address
- arbitrary URL parameters

These values may instead be recorded in logs or traces where
appropriate.

## 8. Route Label Policy

Metrics should use normalized route templates rather than raw
URLs.

Preferred:

route="/products/:id"

Avoid:

path="/products/123456"

## 9. SLI Relationship

The metric catalog must support the previously defined SLIs.

Examples:

### Availability

nexus_http_requests_total

combined with service error measurements.

### Latency

nexus_http_request_duration_seconds

### Traffic

nexus_http_requests_total

### Payment Reliability

nexus_payments_total

and

nexus_payment_failures_total

## 10. Metric Naming

Metric names should:

- Use a consistent `nexus_` namespace
- Describe the measured quantity
- Use `_total` for counters where appropriate
- Use seconds for duration measurements
- Follow Prometheus naming conventions

## 11. Future Metrics

Additional metrics may be introduced for:

- Queue processing
- Database operations
- Cache behavior
- Dependency calls
- Background jobs
- Kubernetes workloads
- Infrastructure resources
- SLO burn rate

New metrics should have an explicit operational purpose.