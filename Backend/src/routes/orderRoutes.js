import express from "express";
import { createOrder,getMyOrders,getAllOrders } from "../controllers/orderController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my",protect,getMyOrders);
router.get("/",protect,authorizeRoles("admin"),getAllOrders);

export default router;