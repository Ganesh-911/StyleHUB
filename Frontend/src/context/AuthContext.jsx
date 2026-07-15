import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [loading, setLoading] = useState(true);

    // Fetch user profile on startup if token exists
    const fetchProfile = useCallback(async (authToken) => {
        try {
            setLoading(true);
            const res = await api.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (res.data && res.data.success) {
                setUser(res.data.user);
            } else {
                setUser(null);
                setToken("");
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
            setUser(null);
            setToken("");
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            fetchProfile(storedToken);
        } else {
            setLoading(false);
        }
    }, [fetchProfile]);

    const login = (newToken, userData) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}