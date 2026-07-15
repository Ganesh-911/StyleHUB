import { useState } from "react";
import api from "../../services/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", formData);

            // Save token
            localStorage.setItem("token", res.data.token);

            // Update Context
            setToken(res.data.token);
            setUser(res.data.user);

            toast.success(res.data.message);

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="w-96 space-y-4 border p-6 rounded-lg shadow"
                >
                    <h1 className="text-3xl font-bold text-center">
                        Login
                    </h1>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
