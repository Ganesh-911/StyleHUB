import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        const existingWishlist = await Wishlist.findOne({
            user: req.user._id,
            product: productId,
        });

        if (existingWishlist) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist",
            });
        }
        const wishlist = await Wishlist.create({
            user: req.user._id,
            product: productId,
        });
        res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            wishlist,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};