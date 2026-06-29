import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Helper function to update product rating
const updateProductRating = async (productId) => {
    const reviews = await Review.find({ product: productId });

    const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    const averageRating =
        reviews.length > 0 ? totalRating / reviews.length : 0;

    await Product.findByIdAndUpdate(productId, {
        rating: averageRating,
        numReviews: reviews.length,
    });
};

export const createReview = async (req, res) => {
    try {

        
        const productId = req.params.id;
        const { rating, comment } = req.body;
        

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check if user purchased this product
        const order = await Order.findOne({
            user: req.user._id,
            "orderItems.product": productId,
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You can review only purchased products",
            });
        }

        // Check if user already reviewed
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId,
        });

        let review;

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;

            review = await existingReview.save();
        } else {
            review = await Review.create({
                user: req.user._id,
                product: productId,
                rating,
                comment,
            });
        }

        // Update product rating and review count
        await updateProductRating(productId);

        return res.status(existingReview ? 200 : 201).json({
            success: true,
            message: existingReview
                ? "Review updated successfully"
                : "Review added successfully",
            review,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getProductReviews = async (req, res) => {
    try {

        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const reviews = await Review.find({
            product: productId,
        }).populate("user", "name email");

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteReview = async (req, res) => {
    try {

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        // Owner or Admin
        if (
            review.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this review",
            });
        }

        const productId = review.product;

        await review.deleteOne();

        await updateProductRating(productId);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};