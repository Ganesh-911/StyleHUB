# Database Design

# Project Name

StyleHUB

---

# Database Technology

MongoDB Atlas

ODM:
Mongoose

---

# Collections

## Users

Stores customer, admin and super admin information.

Fields:

* _id
* name
* email
* password
* role
* phone
* addresses
* isBlocked
* createdAt

---

## Categories

Stores product categories.

Fields:

* _id
* name
* description
* image

Examples:

* Men's Fashion
* Women's Fashion
* Footwear
* Watches
* Bags

---

## Products

Stores product information.

Fields:

* _id
* name
* description
* brand
* categoryId
* images
* basePrice
* variants
* rating
* reviewCount
* createdAt

---

## Product Variants

Stored inside Product document.

Example:

Color:
Black

Sizes:

M → 10

L → 5

XL → 20

---

## Cart

Stores customer shopping cart.

Fields:

* _id
* userId
* items
* totalAmount

---

## Wishlist

Stores saved products.

Fields:

* _id
* userId
* products

---

## Orders

Stores order information.

Fields:

* _id
* userId
* items
* address
* paymentId
* totalAmount
* orderStatus
* createdAt

---

## Reviews

Stores ratings and reviews.

Fields:

* _id
* userId
* productId
* rating
* review
* images

---

## Coupons

Stores discount coupons.

Fields:

* _id
* code
* discountType
* discountValue
* expiryDate

---

## Payments

Stores payment information.

Fields:

* _id
* orderId
* razorpayOrderId
* razorpayPaymentId
* amount
* status

---

# Database Goals

* Avoid duplicate data
* Support scalability
* Support variant inventory
* Support order tracking
* Support payment history

---

# Approval

Prepared By:
Ganesh Gundubogula

Project:
StyleHUB

Status:
Approved
