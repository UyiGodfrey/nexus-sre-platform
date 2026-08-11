# Nexus Shop — Service Level Indicator Specification

## 1. Purpose

This document defines the initial Service Level Indicators
(SLIs) used to measure reliability across Nexus Shop services
and critical user journeys.

## 2. SLI Definition

A Service Level Indicator (SLI) is a quantitative measurement
of an aspect of service behavior or user experience.

SLIs describe what is actually happening.

SLOs will later define the desired target for each important
SLI.

## 3. SLI Categories

The initial SLI categories are:

- Availability
- Latency
- Errors
- Traffic
- Correctness
- Freshness where applicable

## 4. Availability SLI

For request-based services:

Successful valid requests
-------------------------
Total valid requests

The measurement represents the proportion of valid requests
that are successfully served.

## 5. Latency SLI

For latency-sensitive services:

Requests completed within the defined latency threshold
--------------------------------------------------------
Total valid requests

Latency will also be analyzed using percentile measurements
such as p50, p90, p95, and p99.

## 6. Error SLI

Failed valid requests
---------------------
Total valid requests

Error classification will distinguish service failures from
expected client-side or business-level errors where
appropriate.

## 7. Traffic Indicators

Traffic measurements may include:

- Requests per second
- Requests per minute
- Orders per minute
- Payment attempts per minute
- Other service-specific demand measurements

Traffic is primarily used for service understanding,
capacity planning, performance analysis, and incident
investigation.

## 8. Correctness SLI

Where practical, correctness will measure the proportion of
responses or operations that produce valid and expected
results.

Correctness may include:

- Schema validity
- Required-field validation
- Valid state transitions
- Valid business results
- Detection of invalid responses

## 9. Freshness SLI

Where data freshness affects user experience, freshness may
measure the proportion of data updates completed within an
acceptable time window.

## 10. User-Journey SLIs

Critical user journeys will have reliability measurements
where practical.

### Browse Products

Successful browse operations
----------------------------
Browse attempts

### Create Order

Successful order creation operations
------------------------------------
Order creation attempts

### Complete Payment

Successful payment operations
-----------------------------
Payment attempts

### Complete Purchase

Successful completed purchase journeys
--------------------------------------
Purchase attempts

## 11. Service-Level Measurements

The following services will initially receive service-level
SLI measurements:

- API Gateway
- Product Service
- Order Service
- Payment Service

Their primary measurements will include availability,
latency, and error behavior.

## 12. User-Centric Reliability

Infrastructure and resource metrics will not automatically
be treated as user-facing SLIs.

Examples such as CPU utilization, memory utilization, and
disk utilization are supporting telemetry unless they are
directly connected to a defined reliability objective.

## 13. Measurement Principle

SLIs should measure meaningful service behavior rather than
collecting metrics simply because they are technically
available.

The project will prefer user-visible and service-level
measurements over arbitrary infrastructure metrics.