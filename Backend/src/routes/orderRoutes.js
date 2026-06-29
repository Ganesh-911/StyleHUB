import express from "express";
import { createOrder,getMyOrders,getAllOrders,updateOrderStatus,cancelOrder } from "../controllers/orderController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my",protect,getMyOrders);
router.get("/",protect,authorizeRoles("admin"),getAllOrders);
router.put("/:id/status",protect,authorizeRoles("admin"),updateOrderStatus);
router.put("/:id/cancel",protect,cancelOrder);

export default router;