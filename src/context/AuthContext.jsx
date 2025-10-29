// Archivo: context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenEnStorage = localStorage.getItem('token');
        if (tokenEnStorage) {
            try {
                // 1. Decodificar el token (que ahora tiene roles)
                const decodedUser = jwtDecode(tokenEnStorage); 
                setUser(decodedUser); // 2. Guardar el usuario completo
                setToken(tokenEnStorage);
            } catch (error) {
                console.error("Token inválido:", error);
                logoutAction(); 
            }
        }
    }, []); 

    const loginAction = (tokenData) => {
        try {
            localStorage.setItem('token', tokenData);
            // 3. Decodificar el token (que ahora tiene roles)
            const decodedUser = jwtDecode(tokenData);
            setUser(decodedUser); // 4. Guardar el usuario completo
            setToken(tokenData);
            
            // 5. ELIMINAR LAS LLAMADAS 'fetchProfileFromBackend'
            // Ya no son necesarias porque los roles están en el token.
            // fetchProfileFromBackend(tokenData); <--- BORRA ESTO

        } catch (error) {
            console.error("Error al guardar token:", error);
        }
    };

    const logoutAction = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        navigate('/'); 
    };
    
    // 6. ELIMINAR LA FUNCIÓN 'fetchProfileFromBackend'
    // Ya no se usa y está causando los errores 403 y CORS.
    /*
    const fetchProfileFromBackend = async (token) => {
         // ... BORRA TODA ESTA FUNCIÓN ...
    }
    */

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