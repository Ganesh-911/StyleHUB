import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getDashboardStats
);

export default router;