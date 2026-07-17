import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/customer/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import MyOrders from "../pages/customer/MyOrders";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/products" element={<Products />} />

                <Route path="/products/:id" element={<ProductDetails />}/>
                <Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute>}/>
                <Route path="/checkout" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute>}/>
                <Route path="/orders" element={ <ProtectedRoute> <MyOrders /> </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;