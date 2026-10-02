# Nexus SRE Platform

A portfolio project for practicing service metrics, alerting, SLOs, error budgets, and incident visibility.

## What is in the repository

- Express demo service with Prometheus metrics in `app/sre-demo-service/`
- Prometheus scrape configuration and recording/alert rules in `monitoring/prometheus/`
- Alertmanager routing example in `monitoring/alertmanager/`
- SLI, SLO, and error-budget documents
- Failure model and service catalog
- Flask alert webhook and database code in `automation/alert-webhook/`
- React dashboard source in `frontend/`

The service and monitoring artifacts are present in the repository. There is not yet a single Compose file that starts and wires the whole stack.

## Run the metrics demo

Prerequisites: Node.js 18 or later.

```bash
cd app/sre-demo-service
npm ci
node server.js
```

In a second terminal, inspect the Prometheus metrics:

```bash
curl http://localhost:3000/metrics
```

The demo service uses port 3000 by default. Set `PORT` to use a different port.

## Reliability design

- [SLI specification](sli/sli-specification.md) defines the signals to measure.
- [SLO specification](slo/slo-specification.md) defines initial targets over a 30-day window.
- [Error budget policy](error-budget/error-budget-policy.md) explains budget use and response.
- [Prometheus rules](monitoring/prometheus/rules/) calculate payment availability and burn rate and define alerts.
- [Failure model](architecture/failure-model.md) records example failure paths.

The payment availability recording rule uses the same **99.99%** target documented for the Payment Service.

## Configuration boundary

Prometheus and Alertmanager configuration, the webhook service, and dashboard source are examples of the intended incident path. To run the complete path end to end, configure the Prometheus scrape target for the demo service, install the webhook service dependencies, and start the frontend. These components do not currently have a one-command local orchestration file.

## Suggested verification

1. Start the demo service and confirm `/metrics` responds.
2. Configure Prometheus to scrape the service and load the rule files.
3. Confirm the payment availability and burn-rate series appear.
4. Trigger a test alert and inspect Alertmanager delivery.
5. Start the webhook and dashboard, then verify that an alert becomes a visible incident.

## Next improvement

Add a Compose setup and a small scripted failure exercise so reviewers can reproduce the full alert-to-dashboard path with one command.
