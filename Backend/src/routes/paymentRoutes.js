import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRazorpayOrder,verifyPayment,paymentFailed} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);
router.post("/failed",protect,paymentFailed);

export default router;