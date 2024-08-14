import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const res = await fetch('/api/logout/', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Failed to log out:", data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <>
            <header className="bg-gray-800 text-white p-4">
                <nav className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="nav-link">Home</Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <p className="text-slate-400 text-xs">Welcome Back, {user.name}</p>
                            <Link to="/create" className="nav-link">Novo Post</Link>
                            <button onClick={handleLogout} className="nav-link bg-red-500 px-3 py-1 rounded">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/register" className="nav-link">Register</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </div>
                    )}
                </nav>
            </header>

            <main className="container mx-auto p-4">
                <Outlet />
            </main>
        </>
    );
}
