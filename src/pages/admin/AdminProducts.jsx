import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
// No necesitamos 'useAuth' aquí AÚN, porque la lista de productos es pública.
// Lo necesitaremos cuando implementemos "Añadir", "Editar" y "Borrar".

export function AdminProducts() {
    // Definir estados locales: productos, carga, error
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Función helper para formatear moneda (CLP)
    const formatPeso = (value) => {
        return value.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Llamada GET a la API pública de productos
                const response = await fetch('http://localhost:8080/api/productos');

                // Manejar respuesta no exitosa
                if (!response.ok) {
                    throw new Error('Fallo al obtener los productos.');
                }

                const data = await response.json();
                // Guardar productos de la API en el estado
                setProductos(data);

            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError(err.message);
            } finally {
                // Finalizar estado de carga
                setCargando(false);
            }
        };

        fetchProductos();
    }, []); // El array vacío [] hace que se ejecute solo una vez

    // Renderizado condicional basado en el estado de carga
    if (cargando) {
        return <h1 className="mb-4">Cargando productos...</h1>;
    }

    // Renderizado condicional en caso de error
    if (error) {
        return <h1 className="mb-4 text-danger">Error: {error}</h1>;
    }

    // Renderizado principal
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestión de Productos</h1>
                <Button variant="success">Añadir Nuevo Producto</Button>
            </div>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"># ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterar sobre los productos reales del estado */}
                    {productos.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            {/* Acceder al nombre de la categoría anidada */}
                            <td>{product.categoria.nombre}</td>
                            <td>{formatPeso(product.precio)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button variant="primary" size="sm" className="me-2">Editar</Button>
                                <Button variant="danger" size="sm">Borrar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}