import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
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
       order.paymentInfo.razorpayOrderId = razorpayOrder.id;
        
        await order.save();
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
        if (order.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Payment already verified",
            });
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
       const isValidSignature = crypto.timingSafeEqual(
            Buffer.from(expectedSignature),
            Buffer.from(razorpay_signature)
        );

        if (!isValidSignature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }
        for (const item of order.orderItems) {

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `${item.name} not found`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
            }

            product.stock -= item.quantity;

            await product.save();
        }
        order.paymentStatus = "Paid";
        order.orderStatus = "Confirmed";

        order.paymentInfo.razorpayPaymentId = razorpay_payment_id;
        order.paymentInfo.razorpaySignature = razorpay_signature;

        await order.save();
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const paymentFailed = async (req, res) => {
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
                message: "Payment already completed",
            });
        }
        order.paymentStatus = "Failed";

        await order.save();
        return res.status(200).json({
            success: true,
            message: "Payment marked as failed",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
