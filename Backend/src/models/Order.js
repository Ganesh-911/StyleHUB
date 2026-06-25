import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        orderItems:[{
            product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            },

            name: {
            type: String,
            required: true,
            },

            price: {
            type: Number,
            required: true,
            },

            quantity: {
            type: Number,
            required: true,
            }

        }],
        shippingAddress:{
            houseNo:{
                type:String,
                required:true
            },
            street:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            pincode:{
                type:Number,
                required:true
            },
            country:{
                type:String,
                required:true
            }
        },
        totalPrice:{
            type:Number,
            required:true
        },
        paymentStatus:{
            type:String,
            default:"Pending"
        },
        orderStatus:{
            type:String,
            default:"Pending"
        }

    },
    {
        timestamps:true
    }
);
const Order=mongoose.model("Order",orderSchema);
export default Order;