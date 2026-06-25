import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
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