# Use Cases

# Project Name

StyleHUB

---

# UC-001 User Registration

## Actor

Customer

## Precondition

User is not registered.

## Main Flow

1. User opens registration page.
2. User enters details.
3. System validates data.
4. System creates account.
5. System logs user in.
6. Success message displayed.

## Post Condition

User account created successfully.

---

# UC-002 User Login

## Actor

Customer

## Precondition

User account exists.

## Main Flow

1. User enters email and password.
2. System validates credentials.
3. JWT tokens generated.
4. User logged in.
5. Dashboard/Home page displayed.

## Post Condition

Authenticated session created.

---

# UC-003 Search Products

## Actor

Customer

## Main Flow

1. User enters keyword.
2. System searches products.
3. Matching products displayed.

## Post Condition

Filtered product list shown.

---

# UC-004 Add Product To Cart

## Actor

Customer

## Preconditions

* User logged in.
* Product available.

## Main Flow

1. User opens product page.
2. User selects color.
3. User selects size.
4. User clicks Add To Cart.
5. System validates stock.
6. Cart updated.

## Post Condition

Product stored in cart.

---

# UC-005 Add Product To Wishlist

## Actor

Customer

## Main Flow

1. User opens product page.
2. Clicks wishlist icon.
3. Product added to wishlist.

## Post Condition

Wishlist updated.

---

# UC-006 Place Order

## Actor

Customer

## Preconditions

* User logged in.
* Cart contains products.

## Main Flow

1. User opens checkout.
2. Selects address.
3. Reviews cart.
4. Chooses payment method.
5. Initiates Razorpay payment.
6. Payment verified.
7. Order created.
8. Inventory updated.
9. Invoice generated.

## Post Condition

Order successfully created.

---

# UC-007 Cancel Order

## Actor

Customer

## Preconditions

Order not shipped.

## Main Flow

1. User opens order history.
2. Selects order.
3. Clicks cancel.
4. System validates cancellation.
5. Refund initiated if required.

## Post Condition

Order cancelled.

---

# UC-008 Submit Review

## Actor

Customer

## Preconditions

Product delivered.

## Main Flow

1. User opens purchased product.
2. Provides rating.
3. Writes review.
4. Uploads image (optional).
5. Review saved.

## Post Condition

Review visible on product page.

---

# UC-101 Create Product

## Actor

Admin

## Main Flow

1. Admin opens dashboard.
2. Clicks Add Product.
3. Enters product details.
4. Uploads images.
5. Defines variants.
6. Saves product.

## Post Condition

Product available for purchase.

---

# UC-102 Manage Inventory

## Actor

Admin

## Main Flow

1. Admin opens inventory module.
2. Selects product.
3. Updates stock.
4. System stores inventory.

## Post Condition

Inventory updated.

---

# UC-103 Update Order Status

## Actor

Admin

## Main Flow

1. Admin opens order.
2. Selects status.
3. Saves changes.
4. Customer notified.

## Post Condition

Order status updated.

---

# UC-201 Manage Admins

## Actor

Super Admin

## Main Flow

1. Super Admin opens admin management.
2. Creates or removes admin.
3. Saves changes.

## Post Condition

Admin roles updated.

---

# Approval

Prepared By:
Ganesh Gundubogula

Project:
StyleHUB

Status:
Approved
