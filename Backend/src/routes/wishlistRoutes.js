import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addToWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", protect, addToWishlist);

export default router;