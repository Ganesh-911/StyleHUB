# ER Diagram

# Project Name

StyleHub

## Main Entities

User
Category
Product
Cart
Wishlist
Order
Review
Coupon
Payment

---

## Relationships

User (1)
│
├── Cart (1)
├── Wishlist (1)
├── Order (Many)
└── Review (Many)

Category (1)
│
└── Product (Many)

Product (1)
│
├── Review (Many)
└── OrderItem (Many)

Order (1)
│
├── Payment (1)
└── OrderItems (Many)

Coupon (1)
│
└── Orders (Many)

---

## Text ER Diagram

User
|
+---- Cart
|
+---- Wishlist
|
+---- Orders
|
+---- Reviews

Category
|
+---- Products

Products
|
+---- Reviews
|
+---- Order Items

Orders
|
+---- Payments
