# retail-pos-system
Omnichannel POS and Inventory Management System   --MANTASHA MIRZA;NADEEM JAWED;AHTESHAM KHAN;SOHA BEGUM
# Retail POS & Inventory Management System

## Overview

Retail POS & Inventory Management System is a full-stack enterprise-style retail management application developed using the MERN stack. The system provides role-based dashboards for administrators, inventory managers, and cashiers with secure JWT authentication and MongoDB Atlas integration.

The application helps retail stores manage:

* Inventory
* POS Billing
* Orders
* User Management
* Sales Analytics
* Role-Based Access Control (RBAC)

---

# Features

## Authentication & Security

* JWT Authentication
* bcrypt Password Hashing
* Protected Backend APIs
* Role-Based Access Control (RBAC)
* Secure Token Validation

---

## Admin Dashboard

* Business Analytics
* Revenue Tracking
* Pie Charts & Graphs
* User Management
* Sales Reports Export
* Order Monitoring

---

## Inventory Management

* Add Products
* Update Inventory
* Delete Products
* Stock Tracking
* Low Stock Alerts
* Product Search

---

## POS Billing Module

* Cashier Dashboard
* Order Processing
* Billing System
* Order History

---

## User Management

* Add Users
* Delete Users
* Role Assignment
* Admin-Only Access

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Recharts
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Authentication

* JWT
* bcryptjs

---

# Project Architecture

```bash
client/
 ├── components/
 ├── pages/
 ├── services/
 └── App.jsx

server/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── config/
 └── server.js
```

---

# Role-Based Access

| Role                 | Access               |
| -------------------- | -------------------- |
| System Administrator | Full System Access   |
| Inventory Manager    | Inventory Management |
| Store Cashier        | POS Billing Module   |

---

# API Features

## Authentication APIs

* Login User
* JWT Token Generation

## Product APIs

* Create Product
* Fetch Products
* Update Product
* Delete Product
* Update Stock

## Order APIs

* Create Orders
* Fetch Orders
* Sales Analytics

## User APIs

* Create User
* Fetch Users
* Delete Users

---

# Screenshots

## Login Page
<img width="1303" height="741" alt="image" src="https://github.com/user-attachments/assets/fc8a915e-8239-44fc-94e6-d8a7dc3f595c" />

* Secure login using MongoDB Atlas users

## Admin Dashboard
<img width="1303" height="741" alt="image" src="https://github.com/user-attachments/assets/014fecb6-f6e4-4b93-aaf1-5685664a9d71" />
<img width="1303" height="741" alt="image" src="https://github.com/user-attachments/assets/f06740dc-5381-4b7a-b2bc-24366dad32d9" />

* Analytics charts
* Revenue overview
* User management

## Inventory Dashboard
<img width="1303" height="741" alt="image" src="https://github.com/user-attachments/assets/1050756e-97d9-4684-89cb-1535bdcf38d1" />
<img width="1303" height="741" alt="image" src="https://github.com/user-attachments/assets/60ea7f8f-9184-4472-bceb-cad5c556486f" />

* Product management
* Stock tracking
* Inventory analytics

## POS Billing
<img width="1303" height="741" alt="image" src="https://github.com/user-attachments/assets/dbb10c9d-164b-4441-904a-e10d84249343" />

* Cashier billing interface
* Order processing

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/your-username/retail-pos-system.git
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

Create `.env` file inside `server/`

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=retail_pos_enterprise_secure_key
```

---

# MongoDB Atlas

The application uses MongoDB Atlas cloud database for:

* User Authentication
* Product Storage
* Order Management
* Analytics Data

---

# Security Features

* JWT Token Authentication
* bcrypt Password Encryption
* Protected Backend Routes
* Role-Based Middleware
* Secure API Authorization Headers

---

# Current Status

## Completed

* Authentication System
* RBAC Security
* Admin Dashboard
* Inventory Module
* POS Billing Module
* MongoDB Integration
* Analytics Charts
* Protected APIs

## In Progress

* Deployment
* GitHub Actions CI/CD
* UI Enhancements
* Documentation Improvements

---

# Future Enhancements

* Docker Deployment
* Redis Caching
* Advanced Reporting
* Offline POS Support
* Email Notifications
* Unit Testing

---

# Developed By
Soha
Internship Project — Infotact Solutions

Developed using MERN Stack and Enterprise Security Practices.
