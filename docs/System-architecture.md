# System Architecture

# Project Name

StyleHUB

---

# Architecture Type

Monolithic MERN Architecture

---

# Why Monolithic?

Current Project Scope:

* Single Team
* Learning Project
* Faster Development
* Easier Deployment

Future versions may adopt microservices.

---

# High Level Architecture

Customer
↓
Frontend (React + Vite + Tailwind)
↓
Backend API (Node.js + Express)
↓
MongoDB Atlas

External Services:

Cloudinary
Razorpay
Email Service

---

# Frontend Layer

Technology:

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Query

Responsibilities:

* UI Rendering
* State Management
* API Calls
* Form Handling
* Route Protection

---

# Backend Layer

Technology:

* Node.js
* Express.js

Responsibilities:

* Business Logic
* Authentication
* Authorization
* Validation
* Database Operations
* Payment Verification

---

# Database Layer

Technology:

* MongoDB Atlas
* Mongoose

Responsibilities:

* Store Users
* Store Products
* Store Orders
* Store Reviews
* Store Cart Data

---

# Cloudinary Integration

Purpose:

Store product images and review images.

Flow:

Admin Upload
↓
Cloudinary
↓
Image URL Stored In MongoDB

---

# Razorpay Integration

Purpose:

Process online payments.

Flow:

Checkout
↓
Razorpay Order
↓
Payment Success
↓
Payment Verification
↓
Order Creation

---

# Authentication Architecture

Customer Login
↓
JWT Access Token
↓
Protected Routes

Refresh Token Used For:

* Session Continuity
* Security

---

# Role Based Access Control

Roles:

Customer
Admin
Super Admin

Permissions:

Customer → Shopping Operations

Admin → Product & Order Management

Super Admin → Platform Management

---

# Deployment Architecture

Frontend

Vercel

↓

Backend

Render

↓

Database

MongoDB Atlas

---

# Security Layer

* JWT Authentication
* Password Hashing
* Input Validation
* Rate Limiting
* Secure Cookies
* Protected Routes

---

# Scalability Considerations

Future Enhancements:

* Redis Cache
* CDN
* Microservices
* Queue Systems
* Advanced Monitoring

---

# Approval

Prepared By:
Ganesh Gundubogula

Project:
StyleHUB

Status:
Approved
