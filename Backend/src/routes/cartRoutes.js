import express from "express";
import { addToCart, getCart,updateCartQuantity,removeFromCart} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);

router.get("/", protect, getCart);
router.put("/:id",protect,updateCartQuantity);
router.delete("/:id", protect, removeFromCart);
export default router;