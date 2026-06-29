import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import {deleteReview} from "../controllers/reviewController.js";

const router=express.Router();
router.delete("/:id",protect,deleteReview);
export default router;