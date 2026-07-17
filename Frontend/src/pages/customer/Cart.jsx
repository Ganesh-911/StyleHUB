import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/axios";
import toast from "react-hot-toast";

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const res = await api.get("/cart");
            setCart(res.data.cartItems);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch cart"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id, quantity) => {
        try {
            await api.put(`/cart/${id}`, {
                quantity,
            });

            getCart();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update cart"
            );
        }
    };

    const removeItem = async (id) => {
        try {
            const res = await api.delete(`/cart/${id}`);

            toast.success(res.data.message);

            getCart();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to remove item"
            );
        }
    };

    const subtotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-8">
                    My Cart
                </h1>

                {loading ? (
                    <h2 className="text-center text-xl">Loading...</h2>
                ) : cart.length === 0 ? (
                    <h2 className="text-center text-xl">
                        Your cart is empty.
                    </h2>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-5">

                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="border rounded-xl shadow-md p-5 flex justify-between items-center"
                                >

                                    <div>

                                        <h2 className="text-xl font-semibold">
                                            {item.product.name}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            ₹ {item.product.price}
                                        </p>

                                        <div className="flex items-center gap-3 mt-4">

                                            <button
                                                onClick={() =>
                                                    item.quantity > 1 &&
                                                    updateQuantity(
                                                        item._id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                            >
                                                -
                                            </button>

                                            <span className="font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    item.quantity <
                                                        item.product.stock &&
                                                    updateQuantity(
                                                        item._id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            onClick={() =>
                                                removeItem(item._id)
                                            }
                                            className="mt-4 text-red-600 hover:underline"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                    <div>

                                        <h2 className="text-2xl font-bold text-blue-600">
                                            ₹{" "}
                                            {item.product.price *
                                                item.quantity}
                                        </h2>

                                    </div>

                                </div>
                            ))}

                        </div>

                        {/* Order Summary */}

                        <div className="border rounded-xl shadow-md p-6 h-fit sticky top-24">

                            <h2 className="text-2xl font-bold mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-3">
                                <span>Subtotal</span>
                                <span>₹ {subtotal}</span>
                            </div>

                            <div className="flex justify-between mb-3">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>₹ {subtotal}</span>
                            </div>

                            <button
                                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg transition"
                            >
                                Proceed To Checkout
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </Layout>
    );
}

export default Cart;