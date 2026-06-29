import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        if (order.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Order is already paid",
            });
        }
        
        const options = {
            amount: order.totalPrice * 100,
            currency: "INR",
            receipt: order._id.toString(),
        };
        const razorpayOrder = await razorpay.orders.create(options);
        order.paymentInfo = {
            razorpayOrderId: razorpayOrder.id,
        };
        console.log(order.paymentInfo);

        await order.save();
        const updatedOrder = await Order.findById(order._id);
console.log(updatedOrder.paymentInfo);
        return res.status(200).json({
            success: true,
            razorpayOrder,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const verifyPayment = async (req, res) => {
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature,} = req.body;
        const order = await Order.findOne({
            "paymentInfo.razorpayOrderId": razorpay_order_id,
        });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
