# API Design

# Project Name

StyleHub

Base URL:

/api/v1

---

# Authentication APIs

## Register

POST /auth/register

Purpose:
Create new account

---

## Login

POST /auth/login

Purpose:
Authenticate user

---

## Logout

POST /auth/logout

Purpose:
End session

---

## Forgot Password

POST /auth/forgot-password

---

## Reset Password

POST /auth/reset-password

---

# User APIs

## Get Profile

GET /users/profile

---

## Update Profile

PUT /users/profile

---

## Manage Addresses

GET /users/addresses

POST /users/addresses

PUT /users/addresses/:id

DELETE /users/addresses/:id

---

# Category APIs

## Get Categories

GET /categories

---

## Create Category

POST /categories

Admin Only

---

## Update Category

PUT /categories/:id

Admin Only

---

## Delete Category

DELETE /categories/:id

Admin Only

---

# Product APIs

## Get Products

GET /products

Supports:

* Search
* Filter
* Sort
* Pagination

---

## Get Product Details

GET /products/:id

---

## Create Product

POST /products

Admin Only

---

## Update Product

PUT /products/:id

Admin Only

---

## Delete Product

DELETE /products/:id

Admin Only

---

# Cart APIs

## Get Cart

GET /cart

---

## Add To Cart

POST /cart

---

## Update Cart Item

PUT /cart/:itemId

---

## Remove Cart Item

DELETE /cart/:itemId

---

# Wishlist APIs

## Get Wishlist

GET /wishlist

---

## Add Wishlist Item

POST /wishlist

---

## Remove Wishlist Item

DELETE /wishlist/:productId

---

# Order APIs

## Create Order

POST /orders

---

## Get My Orders

GET /orders/my-orders

---

## Get Order Details

GET /orders/:id

---

## Cancel Order

PUT /orders/:id/cancel

---

# Payment APIs

## Create Razorpay Order

POST /payments/create-order

---

## Verify Payment

POST /payments/verify

---

## Refund Payment

POST /payments/refund

Admin Only

---

# Review APIs

## Create Review

POST /reviews

---

## Get Product Reviews

GET /reviews/product/:productId

---

# Coupon APIs

## Validate Coupon

POST /coupons/validate

---

## Create Coupon

POST /coupons

Admin Only

---

# Admin APIs

## Dashboard Analytics

GET /admin/dashboard

---

## Manage Users

GET /admin/users

PUT /admin/users/:id/block

---

## Manage Orders

GET /admin/orders

PUT /admin/orders/:id/status

---

# Response Format

Success:

{
success: true,
data: {}
}

Error:

{
success: false,
message: "Error Message"
}
