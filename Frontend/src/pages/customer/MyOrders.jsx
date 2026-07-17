import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/axios";
import toast from "react-hot-toast";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrders = async () => {
        try {
            const res = await api.get("/orders/my");
            setOrders(res.data.orders);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (id) => {
        try {
            const res = await api.put(`/orders/${id}/cancel`);

            toast.success(res.data.message);

            getOrders();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-20 text-lg">
                    Loading Orders...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No Orders Yet
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (

                            <div
                                key={order._id}
                                className="border rounded-xl p-6 shadow"
                            >

                                <div className="flex justify-between mb-4">

                                    <div>
                                        <p>
                                            <b>Order ID:</b> {order._id}
                                        </p>

                                        <p>
                                            <b>Status:</b> {order.orderStatus}
                                        </p>

                                        <p>
                                            <b>Payment:</b> {order.paymentStatus}
                                        </p>

                                        <p>
                                            <b>Total:</b> ₹{order.totalPrice}
                                        </p>

                                    </div>

                                    {(order.orderStatus === "Pending" ||
                                      order.orderStatus === "Confirmed") && (

                                        <button
                                            onClick={() => cancelOrder(order._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>

                                    )}

                                </div>

                                <hr className="my-4" />

                                {order.orderItems.map((item) => (

                                    <div
                                        key={item.product}
                                        className="flex justify-between py-2"
                                    >

                                        <div>

                                            <p className="font-semibold">
                                                {item.name}
                                            </p>

                                            <p>
                                                Qty : {item.quantity}
                                            </p>

                                        </div>

                                        <div>
                                            ₹{item.price}
                                        </div>

                                    </div>

                                ))}

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </Layout>
    );
}

export default MyOrders;