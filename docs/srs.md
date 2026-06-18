# Software Requirements Specification (SRS)

# Project Name

StyleHUB

# Version

1.0
---
# Purpose

The purpose of StyleHub is to provide a complete fashion and lifestyle e-commerce platform where customers can browse products, manage carts, place orders, make payments, and track deliveries while administrators manage products, categories, users, inventory, and orders.

---

# Scope

StyleHub will support:

* Customer Management
* Product Management
* Category Management
* Inventory Management
* Cart Management
* Wishlist Management
* Order Management
* Payment Management
* Review Management
* Administrative Controls

---

# User Roles

## Customer

Permissions:

* Register
* Login
* Browse Products
* Search Products
* Manage Cart
* Manage Wishlist
* Place Orders
* Track Orders
* Submit Reviews

---

## Admin

Permissions:

* Manage Products
* Manage Categories
* Manage Inventory
* Manage Orders
* Manage Coupons
* Manage Users

---

## Super Admin

Permissions:

* Manage Admins
* View Platform Analytics
* Platform Configuration
* Audit Monitoring

---

# Functional Requirements

## Authentication Module

The system shall:

* Register users
* Authenticate users
* Allow password reset
* Support JWT Authentication
* Support Refresh Tokens
* Support Role Based Access Control

---

## Product Module

The system shall:

* Create products
* Update products
* Delete products
* View products
* Search products
* Filter products
* Sort products

Each product shall support:

* Name
* Description
* Price
* Images
* Brand
* Category
* Variants
* Stock

---

## Product Variants

The system shall support:

* Multiple Colors
* Multiple Sizes
* Variant Level Stock Tracking

Example:

Black-M → 10

Black-L → 5

White-M → 12

---

## Category Module

The system shall:

* Create categories
* Update categories
* Delete categories
* Assign products to categories

---

## Cart Module

The system shall:

* Add products to cart
* Remove products from cart
* Update quantities
* Calculate totals

---

## Wishlist Module

The system shall:

* Add wishlist items
* Remove wishlist items
* Move items to cart

---

## Checkout Module

The system shall:

* Select address
* Select payment method
* Calculate final amount
* Generate order

---

## Payment Module

The system shall:

* Integrate Razorpay
* Create payment orders
* Verify payments
* Handle failed payments
* Process refunds

---

## Order Module

The system shall:

* Create orders
* Track orders
* Cancel orders
* Return orders

Order Status:

* Pending
* Confirmed
* Packed
* Shipped
* Delivered
* Cancelled
* Returned

---

## Review Module

The system shall:

* Submit ratings
* Submit reviews
* Upload review images

---

## Notification Module

The system shall:

* Send order confirmation
* Send payment confirmation
* Send status updates

---

# Non Functional Requirements

## Performance

* Page Load < 3 Seconds
* API Response < 500ms

---

## Scalability

The system shall support future scaling.

---

## Security

The system shall:

* Hash passwords
* Validate JWT
* Prevent unauthorized access
* Validate inputs

---

## Availability

Target Availability:

99%

---

## Reliability

The system shall prevent data corruption.

---

# Technology Requirements

Frontend:

* React
* Vite
* Tailwind CSS

Backend:

* Node.js
* Express.js

Database:

* MongoDB
* Mongoose

Storage:

* Cloudinary

Payments:

* Razorpay

Deployment:

* Vercel
* Render
* MongoDB Atlas

---

# Assumptions

* Users have internet access.
* Payments are processed through Razorpay.
* Cloudinary is available for image storage.

---

# Constraints

* Development Duration: 8 Weeks
* Daily Development Time: 2 Hours
* MERN Stack Only

---

# Approval

Prepared By:
Ganesh Gundubogula

Project:
StyleHUB

Status:
Approved For Design Phase
