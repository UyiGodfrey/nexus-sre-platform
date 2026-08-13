# Nexus SRE Platform 🚀

An end-to-end Site Reliability Engineering (SRE) incident management platform built to demonstrate real-world reliability engineering practices.

The platform collects application alerts, processes incidents, stores incident data, and provides an operational dashboard for monitoring reliability events.

---

# Project Overview

Modern systems require more than just deployment. SRE focuses on:

- Reliability
- Availability
- Monitoring
- Incident response
- Service health
- Error budgets
- Operational excellence

Nexus SRE Platform demonstrates these principles by creating an incident lifecycle:

Application Failure → Monitoring Alert → Alert Processing → Incident Storage → SRE Dashboard

---

#              Architecture
                Application Service
                       |
                       |
                Prometheus Monitoring
                       |
                       |
                AlertManager
                       |
                       |
             Flask Alert Webhook API
                       |
                       |
              Incident Database
                       |
                       |
              React SRE Dashboard


---

# Features

## Incident Management

- Receive monitoring alerts
- Generate incident records
- Track incident status
- Store incident history
- Display operational events

---

## SRE Dashboard

The React dashboard provides:

- Total incidents
- Active incidents
- Critical incidents
- Resolved incidents
- Incident table view

---

## Observability

Implemented concepts:

- Metrics collection
- Alert rules
- Alert routing
- Incident visibility
- Operational monitoring

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- CSS

## Backend

- Python
- Flask
- Flask-CORS

## Monitoring

- Prometheus
- AlertManager

## Storage

- SQLite

## Version Control

- Git
- GitHub

---

# Project Structure
nexus-sre-platform/
├── frontend/
│   ├── React Dashboard
│
├── automation/
│   └── alert-webhook/
│       ├── app.py
│       ├── database.py
│
├── monitoring/
│   ├── prometheus/
│   └── alertmanager/
│
├── docs/
│
└── README.md


---

# Running Locally

## Start Backend

```bash
cd automation/alert-webhook

python app.py

Backend runs on:
http://localhost:5001

Start Frontend
cd frontend

npm install

npm run dev

# Frontend runs on:
http://localhost:5173

# Example Incident
Incident ID:
INC-E4EBA625

Alert:
DatabaseConnectionFailure

Severity:
Critical

Status:
Firing

SRE Concepts Demonstrated
✅ Monitoring
✅ Alerting
✅ Incident Management
✅ Observability
✅ Error Budgets
✅ SLI/SLO Concepts
✅ Reliability Engineering Workflow
✅ Operational Dashboards  
Future Improvements
PostgreSQL migration
Kubernetes deployment
Grafana dashboards
PagerDuty integration
Automated remediation
AI incident analysis
Chaos engineering tests

Author
Godfrey Uyioghosa Glory
Cloud / DevOps / SRE Engineer