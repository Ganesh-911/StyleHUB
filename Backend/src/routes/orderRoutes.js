import express from "express";
import { createOrder,getMyOrders,getAllOrders,updateOrderStatus } from "../controllers/orderController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my",protect,getMyOrders);
router.get("/",protect,authorizeRoles("admin"),getAllOrders);
router.put("/:id/status",protect,authorizeRoles("admin"),updateOrderStatus);

export default router;