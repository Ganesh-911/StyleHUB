import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">

            <Link
                to="/"
                className="text-2xl font-bold"
            >
                StyleHub
            </Link>

            <div className="flex gap-6">

                <Link to="/">Home</Link>

                <Link to="/products">Products</Link>

                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>

            </div>

        </nav>
    );
}

export default Navbar;