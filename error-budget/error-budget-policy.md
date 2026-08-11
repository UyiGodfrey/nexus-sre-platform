# Nexus Shop — Error Budget Policy

## 1. Purpose

The error budget provides a measurable mechanism for
balancing reliability and engineering velocity.

An error budget represents the amount of unreliability
permitted by an SLO during its measurement window.

## 2. Formula

Error Budget = 100% - SLO

For availability-based SLOs, the budget can also be
translated into an allowable amount of unavailable time.

## 3. Measurement Window

The initial error budget window is aligned with the
30-day rolling SLO window.

## 4. Initial Error Budgets

| Service | SLO | Error Budget | Approximate 30-Day Budget |
|---|---:|---:|---:|
| API Gateway | 99.95% | 0.05% | 21m 36s |
| Product Service | 99.90% | 0.10% | 43m 12s |
| Order Service | 99.95% | 0.05% | 21m 36s |
| Payment Service | 99.99% | 0.01% | 4m 19s |

## 5. Budget States

### Healthy

More than 50% of the error budget remains.

Normal engineering and release activity may continue.

### Warning

Between 25% and 50% of the error budget remains.

Actions may include:

- Reviewing reliability trends
- Investigating recent incidents
- Reviewing alert quality
- Prioritizing reliability improvements

### Critical

Less than 25% of the error budget remains.

Actions may include:

- Reducing unnecessary operational risk
- Prioritizing reliability engineering
- Reviewing planned releases
- Investigating major budget-consuming events

### Exhausted

The error budget has reached zero or the SLO has been
materially violated.

Reliability work becomes the immediate priority.

High-risk changes may be paused until reliability is
restored, subject to business and incident considerations.

## 6. Budget Consumption

Error budget consumption will be tracked over time.

Important measurements include:

- Remaining budget
- Consumed budget
- Percentage consumed
- Burn rate
- SLO compliance

## 7. Burn Rate

Burn rate represents the rate at which the available
error budget is being consumed.

A high burn rate indicates that reliability is deteriorating
faster than the expected budget consumption rate.

Burn-rate-based alerting may be implemented to identify
rapid reliability degradation.

## 8. Release Policy

When the error budget is healthy, normal release activity
may proceed.

When the budget is being rapidly consumed, releases should
be evaluated for additional reliability risk.

When the budget is critically low or exhausted, reliability
work should receive priority over high-risk changes.

## 9. Error Budget Philosophy

An error budget is not a target for failure.

Teams should not intentionally consume the budget.

The budget represents an agreed tolerance for unreliability
while allowing engineering teams to continue delivering
useful changes.

## 10. Shared Responsibility

Application, platform, infrastructure, and SRE teams share
responsibility for understanding and improving error-budget
performance.

SRE provides the measurement and reliability framework,
while service owners remain responsible for the reliability
of their services.