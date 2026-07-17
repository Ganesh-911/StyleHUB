import { useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
});

    const handleChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        });
    };

    const placeOrder = async () => {
        try {
            console.log("Shipping Address:", shippingAddress);
            const res = await api.post("/orders", {
                shippingAddress,
            });

            toast.success(res.data.message);

            navigate("/orders");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to place order"
            );

        }
    };

    return (
        <Layout>

            <div className="max-w-3xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-8">
                    Checkout
                </h1>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="houseNo"
                        placeholder="House No"
                        value={shippingAddress.houseNo}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={shippingAddress.street}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shippingAddress.state}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pin Code"
                        value={shippingAddress.pincode}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={shippingAddress.country}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <button
                        onClick={placeOrder}
                        className="w-full bg-slate-900 text-white py-3 rounded-lg"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </Layout>
    );
}

export default Checkout;