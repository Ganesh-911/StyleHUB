import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { token, user, setToken, setUser } = useAuth();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    };

    return (
        <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
                StyleHub
            </Link>

            <div className="flex gap-5 items-center">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/wishlist">Wishlist</Link>
                        <Link to="/cart">Cart</Link>

                        {user?.role === "admin" && (
                            <Link to="/admin/dashboard">Dashboard</Link>
                        )}

                        <button
                            onClick={logoutHandler}
                            className="bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;