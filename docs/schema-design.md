# MongoDB Schema Design

# User Schema

Fields:

* name
* email
* password
* role
* phone
* addresses
* isBlocked
* createdAt
* updatedAt

Roles:

* customer
* admin
* superAdmin

---

# Category Schema

Fields:

* name
* description
* image

---

# Product Schema

Fields:

* name
* description
* brand
* categoryId
* images
* basePrice

Variants:

* color
* size
* stock

Additional Fields:

* rating
* reviewCount
* isFeatured
* createdAt

---

# Cart Schema

Fields:

* userId
* items
* totalAmount

Item Fields:

* productId
* quantity
* size
* color

---

# Wishlist Schema

Fields:

* userId
* products

---

# Order Schema

Fields:

* userId
* items
* shippingAddress
* paymentId
* totalAmount
* orderStatus

Order Status:

* pending
* confirmed
* packed
* shipped
* delivered
* cancelled
* returned

---

# Review Schema

Fields:

* userId
* productId
* rating
* comment
* images

---

# Coupon Schema

Fields:

* code
* discountType
* discountValue
* expiryDate
* minimumOrderAmount

---

# Payment Schema

Fields:

* orderId
* razorpayOrderId
* razorpayPaymentId
* amount
* status

Payment Status:

* pending
* success
* failed
* refunded

