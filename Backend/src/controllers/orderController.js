import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const createOrder = async (req, res) => {
    try{
        const cartItems= await Cart.find({
            user:req.user._id
        }).populate("product");
        if(cartItems.length===0){
            return res.status(400).json({
                success:false,
                message:"Cart is empty"
            });
        }
        let totalPrice=0;
        const orderItems=[];
        // console.log("req.user:", req.user);
        // console.log("cartItems:", cartItems);
        for(const item of cartItems){
        //    console.log("item.product:", item.product);
            const product= await Product.findById(item.product._id);
            if(!product){
                return res.status(400).json({
                    success:false,
                    message:"Product not found",
                });
            }
            if(product.stock<item.quantity){
                return res.status(400).json({
                    success:false,
                    message:`Insufficient stock for ${product.name}`,
                });
            }
            // product.stock -= item.quantity;
            // await product.save();
            orderItems.push({
                product: item.product._id,
                name:item.product.name,
                price:item.product.price,
                quantity: item.quantity
            });
            totalPrice+=item.product.price * item.quantity;
        }
        const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress: req.body.shippingAddress,
            totalPrice,
        });
        await Cart.deleteMany({
            user: req.user._id
        });
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    }
    catch(error){
        console.error(error);

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
export const getMyOrders= async(req,res)=>{
    try{
        const orders=await Order.find({
            user:req.user._id
        });
        res.status(200).json({
            success:true,
            count: orders.length,
            orders
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
export const updateOrderStatus = async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(400).json({
                success:false,
                message:"Order not found",
            });
        }
            const validTransitions = {
            Pending: ["Confirmed", "Cancelled"],
            Confirmed: ["Packed", "Cancelled"],
            Packed: ["Shipped"],
            Shipped: ["Delivered"],
            Delivered: [],
            Cancelled: []
        };

        const currentStatus = order.orderStatus;
        const newStatus = req.body.orderStatus;

        if (!validTransitions[currentStatus].includes(newStatus)) {
            return res.status(400).json({
                success: false,
                message: `Cannot change order from ${currentStatus} to ${newStatus}`
            });
        }
        order.orderStatus=newStatus;
        await order.save();
        res.status(200).json({
            success:true,
            message:"Order status updated successfully",
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order is already cancelled",
            });
        }
        if (order.orderStatus === "Shipped" ||order.orderStatus === "Delivered" ) {
            return res.status(400).json({
                success: false,
                message: `Cannot cancel ${order.orderStatus} order`,
            });
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to cancel this order",
            });
        }
        if (order.paymentStatus === "Paid") {
            for (const item of order.orderItems) {

                const product = await Product.findById(item.product);

                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
        }
        order.orderStatus = "Cancelled";
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};