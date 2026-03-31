# SmartInv Backend | Order & Inventory Management API

A robust, scalable API for managing inventory, categories, orders, and system activities. Built with **Express**, **Mongoose**, and **Zod** for high reliability and data integrity.

## 🚀 Repositories
- **Frontend Repository:** [github.com/apponislam/OrderManagement-Frontend.git](https://github.com/apponislam/OrderManagement-Frontend.git)
- **Backend Repository:** [github.com/apponislam/OrderManagement-Backend.git](https://github.com/apponislam/OrderManagement-Backend.git)

---

## ✨ Key Features

- **Inventory Tracking:** Real-time stock updates with automated status switching (In Stock / Out of Stock).
- **Transaction-Safe Orders:** Uses MongoDB transactions to ensure atomic stock deduction and order placement.
- **Role-Based Access Control (RBAC):** Secure endpoints for Admin and Manager roles.
- **Activity Logging:** System-wide audit trail for all critical actions (CRUD, status changes, etc.).
- **Zod Validation:** Comprehensive request validation and type safety.
- **Advanced Error Handling:** Global error middleware with standardized responses.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Validation:** Zod
- **Authentication:** JWT (JSON Web Token) & Bcrypt
- **Language:** TypeScript

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URL=mongodb://localhost:27017/smartinv
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=your_access_secret
   JWT_ACCESS_EXPIRE=30d
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRE=365d
   ```

3. **Run in Development Mode:**
   ```bash
   npm run dev
   ```

4. **Build and Run for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📝 API Endpoints

Check `api-docs.json` for a full list of available routes including:
- `/api/v1/auth`: Login, Signup
- `/api/v1/product`: Inventory Management
- `/api/v1/category`: Category Organization
- `/api/v1/order`: Fulfillment & Cancellation
- `/api/v1/dashboard`: System Statistics
- `/api/v1/activity`: System-wide Audit Trail
