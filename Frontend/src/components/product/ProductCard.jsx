import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
            <img
                src={product.images?.[0] || "https://placehold.co/300x300"}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-3">
                {product.name}
            </h2>

            <p className="text-gray-600">
                ₹{product.price}
            </p>

            <Link
                to={`/products/${product._id}`}
                className="inline-block mt-3 bg-slate-900 text-white px-4 py-2 rounded"
            >
                View Details
            </Link>
        </div>
    );
}

export default ProductCard;