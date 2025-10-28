import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

   const addToCart = (product) => {
        setCartItems(prevItems => {
            // Revisar si el producto ya está en el carrito
            const itemExists = prevItems.find(item => item.id === product.id);

            if (itemExists) {
                //Si existe, actualizamos la cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, lo añadimos con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        console.log("Producto añadido:", product.nombre);
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== productId)
        );
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};