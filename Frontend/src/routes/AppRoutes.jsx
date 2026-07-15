import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/customer/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/products" element={<Products />} />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;