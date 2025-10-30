import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); // Hook para redirigir al usuario
    const { token, user } = useAuth(); // Obtener token y user del AuthContext

    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Revisar si el producto ya está en el carrito
            const itemExists = prevItems.find(item => item.id === product.id);

            if (itemExists) {
                // Si existe, verificar stock antes de aumentar la cantidad
                if (itemExists.quantity >= product.stock) {
                    alert(`No puedes agregar más de ${product.stock} unidades de ${product.nombre}.`);
                    return prevItems; // Devolver items sin cambios
                }
                // Si hay stock, actualizamos la cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si es un producto nuevo, verificar que haya stock
                if (product.stock <= 0) {
                    alert(`El producto ${product.nombre} está sin stock.`);
                    return prevItems;
                }
                // Si no existe, lo añadimos con cantidad 1
                const imgPath = product.img || (product.imagenUrl ? `/img/${product.imagenUrl}` : product.imagen || '');
                return [...prevItems, { ...product, quantity: 1, img: imgPath }];
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



     // Función para Vacíar el carrito
    
    const clearCart = () => {
        setCartItems([]);
    };

    
    //Envía el carrito al backend para crear un pedido.
    const finalizarCompra = async (costoEnvio) => {
       if (!token) { 
            alert("Debes iniciar sesión para poder comprar.");
            navigate('/login');
            return;
        }

        // Validar que el carrito no esté vacío
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        // 4. Transformar los datos del carrito al formato del DTO del backend
        // El DTO (CrearPedidoRequest) espera: { items: [{ productoId: ..., cantidad: ... }], costoEnvio: ... }
        const pedidoRequest = {
            items: cartItems.map(item => ({
                productoId: item.id,
                cantidad: item.quantity // Mapea 'quantity' (React) a 'cantidad' (Java DTO)
            })),
            costoEnvio: costoEnvio
        };

        // Realizar la llamada fetch al endpoint 
        try {
            const response = await fetch('http://localhost:8080/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Adjunta el token JWT para la autorización
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(pedidoRequest)
            });

            // Manejar la respuesta del backend
            if (!response.ok) {
                // Captura errores del backend (ej. "Stock insuficiente")
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al procesar el pedido');
            }

            // Si todo salió bien (éxito)
            alert('¡Compra realizada con éxito!');
            clearCart(); // Vacía el carrito local
            navigate('/compras'); // Redirige al usuario

        } catch (error) {
            console.error('Error al finalizar la compra:', error);
            // Muestra el error específico del backend (ej. "Stock insuficiente")
            alert(`Error: ${error.message}`);
        }
    };


    // Exponer las nuevas funciones en el 'value'
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart, 
        finalizarCompra 
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};