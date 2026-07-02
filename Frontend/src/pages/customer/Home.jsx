import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
function Home() {
    const {token}=useAuth();
    console.log(token);
    return (
        <Layout>
            

            <div className="text-center py-20">

                <h1 className="text-5xl font-bold">
                    Welcome to StyleHub
                </h1>

            </div>

        </Layout>
    );
}

export default Home;