import { useState } from "react";
import api from "../../services/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const res = await api.post("/auth/register", formData);

        toast.success(res.data.message);

        navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-96 space-y-4 border p-6 rounded-lg shadow"
            >
                <h1 className="text-3xl font-bold text-center">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

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

                <button type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;