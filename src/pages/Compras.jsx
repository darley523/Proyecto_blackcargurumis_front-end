import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";
import { useCart } from "../context/CartContext";
import { useMemo } from "react";

export function Compras() {
    const COSTO_ENVIO = 3500;
    
    const { cartItems, removeFromCart, finalizarCompra, clearCart } = useCart();
    
    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    }, [cartItems]);

    const total = subtotal + COSTO_ENVIO;

    const formatPeso = (value) => {
        return value.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    // Función que llama al contexto
    const handleIrAPagar = async () => {
        await finalizarCompra();
    };

    // Cancelar compra/vaciar carrito
    const handleCancelar = () => {
        if (window.confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
            clearCart();
        }
    };

    return (
        <>
            <Navbar />
            <main className="carrito-main-contenedor">
                <h1>Mi Carrito de Compras</h1>
                <div className="carrito-vista">
                    <section className="carrito-productos">
                        {cartItems.length === 0 ? (
                            <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Tu carrito está vacío.</p>
                        ) : (
                            cartItems.map(item => (
                                <div className="carrito-item" key={item.id}>
                                    <img src={item.img} alt={item.nombre} />
                                    <div className="carrito-item-info">
                                        <h3>{item.nombre}</h3>
                                        <p>Precio: {formatPeso(item.precio)}</p>
                                    </div>
                                    <div className="carrito-item-cantidad">
                                        <label htmlFor={`cantidad-${item.id}`}>Cantidad:</label>
                                        <input
                                            type="number"
                                            id={`cantidad-${item.id}`}
                                            value={item.quantity}
                                            min="1"
                                            readOnly
                                        />
                                    </div>
                                    <div className="carrito-item-subtotal">
                                        <p>Subtotal: {formatPeso(item.precio * item.quantity)}</p>
                                    </div>
                                    <button
                                        className="btn-eliminar"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        )}
                    </section>

                    <aside className="carrito-resumen">
                        <h2>Resumen de la Compra</h2>
                        <div className="resumen-linea">
                            <span>Subtotal:</span>
                            <span>{formatPeso(subtotal)}</span>
                        </div>
                        <div className="resumen-linea">
                            <span>Envío:</span>
                            <span>{subtotal === 0 ? formatPeso(0) : formatPeso(COSTO_ENVIO)}</span>
                        </div>
                        <div className="resumen-total">
                            <span>Total:</span>
                            <span>{subtotal === 0 ? formatPeso(0) : formatPeso(total)}</span>
                        </div>

                        <button 
                            className="btn-pago" 
                            disabled={cartItems.length === 0}
                            onClick={handleIrAPagar} 
                        >
                            Realizar Pedido
                        </button>

                        <button 
                            className="btn-cancelar" 
                            disabled={cartItems.length === 0}
                            onClick={handleCancelar}
                        >
                            Cancelar Compra
                        </button>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}