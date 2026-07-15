import { useEffect, useState } from "react";
import api from "../../services/axios";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import toast from "react-hot-toast";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data.products);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch products"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-8">
                    All Products
                </h1>

                {loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                )}

            </div>
        </Layout>
    );
}

export default Products;