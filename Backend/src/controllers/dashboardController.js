import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const paidOrders = await Order.find({
            paymentStatus: "Paid",
        });

        let totalRevenue = 0;

        for (const order of paidOrders) {
            totalRevenue += order.totalPrice;
        }
        const pendingOrders = await Order.countDocuments({
            orderStatus: "Pending",
        });

        const confirmedOrders = await Order.countDocuments({
            orderStatus: "Confirmed",
        });

        const packedOrders = await Order.countDocuments({
            orderStatus: "Packed",
        });

        const shippedOrders = await Order.countDocuments({
            orderStatus: "Shipped",
        });

        const deliveredOrders = await Order.countDocuments({
            orderStatus: "Delivered",
        });

        const cancelledOrders = await Order.countDocuments({
            orderStatus: "Cancelled",
        });
        const outOfStockProducts = await Product.countDocuments({
            stock: 0,
        });
        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                pendingOrders,
                confirmedOrders,
                packedOrders,
                shippedOrders,
                deliveredOrders,
                cancelledOrders,
                outOfStockProducts,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};