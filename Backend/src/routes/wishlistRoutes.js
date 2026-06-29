import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addToWishlist,getMyWishlist,removeFromWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", protect, addToWishlist);
router.get("/",protect,getMyWishlist);
router.delete("/:productId",protect,removeFromWishlist);

export default router;