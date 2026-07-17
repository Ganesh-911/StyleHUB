import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import api from "../../services/axios";
import toast from "react-hot-toast";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const getProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data.product);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch product"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    const addToCartHandler = async () => {
    try {
        const res = await api.post("/cart/add", {
            productId: product._id,
            quantity,
        });

        console.log(res.data);
        toast.success(res.data.message);

    } catch (error) {
        console.log(error.response);
        console.log(error.response?.data);

        toast.error(
            error.response?.data?.message || "Failed to add to cart"
        );
    }
};

    if (loading) {
        return (
            <Layout>
                <h2 className="text-center mt-10">Loading...</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-10">

                <img
                    src="https://placehold.co/500x500?text=StyleHub"
                    alt={product.name}
                    className="w-full rounded-xl shadow"
                />

                <div>

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>

                    <p className="mt-4 text-gray-600">
                        {product.description}
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-6">
                        ₹ {product.price}
                    </h2>

                    <p className="mt-3">
                        Brand : {product.brand}
                    </p>

                    <p>
                        Category : {product.category}
                    </p>

                    <p>
                        Rating : {product.rating}
                    </p>

                    <p>
                        Stock : {product.stock}
                    </p>
                  <div className="flex items-center gap-4 mt-6">

                  <button
                      onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                      }
                      className="bg-gray-300 px-4 py-2 rounded"
                  >
                      -
                  </button>

                  <span className="text-xl font-semibold">
                      {quantity}
                  </span>

                  <button
                      onClick={() =>
                          quantity < product.stock &&
                          setQuantity(quantity + 1)
                      }
                      className="bg-gray-300 px-4 py-2 rounded"
                  >
                      +
                  </button>

              </div>
                   <button
                    onClick={addToCartHandler}
                    disabled={product.stock === 0}
                    className="mt-8 w-full bg-slate-900 text-white py-3 rounded-lg disabled:bg-gray-400"
                >
                    {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
                </button>

                </div>

            </div>
        </Layout>
    );
}

export default ProductDetails;