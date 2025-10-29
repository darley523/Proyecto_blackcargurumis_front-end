import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; //
import { useNavigate } from 'react-router-dom';

// Crea el Contexto
const AuthContext = createContext();

// Crea el "Hook" para usar el contexto 
export const useAuth = () => useContext(AuthContext);

// Crea el Proveedor del Contexto
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Efecto que se ejecuta cuando el token cambia (o al cargar la página)
    useEffect(() => {
        const tokenEnStorage = localStorage.getItem('token');
        if (tokenEnStorage) {
            try {
                // Decodifica el token para obtener los datos del usuario
                const decodedUser = jwtDecode(tokenEnStorage); 
                setUser(decodedUser); // Guarda los datos del usuario
                setToken(tokenEnStorage);
            } catch (error) {
                // Si el token es inválido o expira
                console.error("Token inválido:", error);
                logoutAction(); // Limpia todo
            }
        }
    }, []); // El array vacío hace que se ejecute solo al inicio

    /**
     * Acción de Login: Guarda el token y los datos del usuario
     */
    const loginAction = (tokenData) => {
        try {
            localStorage.setItem('token', tokenData);
            const decodedUser = jwtDecode(tokenData);
            setUser(decodedUser);
            setToken(tokenData);
        } catch (error) {
            console.error("Error al guardar token:", error);
        }
    };

    /**
     * Acción de Logout: Limpia el estado y el localStorage
     */
    const logoutAction = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        navigate('/'); // Redirige al inicio
    };

    // Define los valores que compartirá el proveedor
    const value = {
        token,
        user,
        loginAction,
        logoutAction
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};