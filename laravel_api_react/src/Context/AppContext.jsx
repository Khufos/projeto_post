import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);

    async function getUser() {
        try {
            const res = await fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Falha ao buscar o usuário');
            }

            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error(error);
            // Lidar com o erro, talvez removendo o token ou redirecionando para login
            setToken('');
            setUser(null);
            localStorage.removeItem('token');
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}
