# Nexus Shop — Service Catalog

## 1. Purpose

The service catalog defines the major services, dependencies,
ownership boundaries, criticality, and reliability context
of the Nexus Shop platform.

## 2. Services

### API Gateway

**Purpose:**  
Provides the primary entry point for client requests and
routes requests to backend services.

**Criticality:** Critical

**Dependencies:**
- Product Service
- Order Service
- Payment Service

**Primary User Journey Impact:**
- Browse Products
- Create Order
- Complete Payment

---

### Product Service

**Purpose:**  
Provides product catalog and product information.

**Criticality:** High

**Dependencies:**
- Product Database

**Primary User Journey Impact:**
- Browse Products

---

### Order Service

**Purpose:**  
Creates and manages customer orders.

**Criticality:** Critical

**Dependencies:**
- Order Database

**Primary User Journey Impact:**
- Create Order
- Complete Purchase

---

### Payment Service

**Purpose:**  
Processes and tracks customer payments.

**Criticality:** Critical

**Dependencies:**
- Payment Database

**Primary User Journey Impact:**
- Complete Payment
- Complete Purchase

---

### Product Database

**Purpose:**  
Persistent storage for product information.

**Criticality:** High

**Consumed By:**
- Product Service

---

### Order Database

**Purpose:**  
Persistent storage for customer orders.

**Criticality:** Critical

**Consumed By:**
- Order Service

---

### Payment Database

**Purpose:**  
Persistent storage for payment-related information.

**Criticality:** Critical

**Consumed By:**
- Payment Service

---

## 3. Dependency Graph

```text
                         USER
                           |
                           v
                    +-------------+
                    | API Gateway |
                    +------+------+
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
      +-------------+ +-------------+ +-------------+
      |   Product   | |    Order    | |   Payment   |
      |   Service   | |   Service   | |   Service   |
      +------+------+ +------+------+ +------+------+
             |               |               |
             v               v               v
      +-------------+ +-------------+ +-------------+
      | Product DB  | |  Order DB   | | Payment DB  |
      +-------------+ +-------------+ +-------------+