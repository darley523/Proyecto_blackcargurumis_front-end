import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { CrearEditarProductoAdmin } from '../../componentes/CrearEditarProductoAdmin'; // 1. Importar el nuevo modal

export function AdminProducts() {
    // Estados de la tabla
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el Modal
    const [showModal, setShowModal] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null); // null = Añadir, Objeto = Editar

    // Obtener token del admin
    const { token } = useAuth();

    // Helper para formatear (sin cambios)
    const formatPeso = (value) => {
        return value.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    // --- Lógica de Carga de Datos (GET) ---
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/productos');
                if (!response.ok) throw new Error('Fallo al obtener los productos.');
                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        fetchProductos();
    }, []);

    // --- Lógica de Borrado (DELETE) ---
    const handleDelete = async (productoId) => {
        if (!window.confirm(`¿Seguro que deseas eliminar el producto ID ${productoId}?`)) return;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/productos/${productoId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Error al eliminar el producto');

            // Actualizar estado local
            setProductos(prev => prev.filter(p => p.id !== productoId));
            alert('Producto eliminado.');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // --- Lógica de Guardado (POST / PUT) ---
    const handleSave = async (formData) => {
        // Determinar si es Añadir (POST) o Editar (PUT)
        const esModoEditar = !!productoAEditar;
        const url = esModoEditar
            ? `http://localhost:8080/api/admin/productos/${productoAEditar.id}`
            : 'http://localhost:8080/api/admin/productos';
        const method = esModoEditar ? 'PUT' : 'POST';

        // Hay que transformar 'categoriaId' en un objeto 'categoria'.
        const bodyParaApi = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: Number(formData.precio),
            stock: Number(formData.stock),
            imagenUrl: formData.imagenUrl,
            activo: true, // Asumir que siempre está activo
            categoria: {
                id: Number(formData.categoriaId) // Enviar solo el ID anidado
            }
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyParaApi)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar el producto');
            }

            const productoGuardado = await response.json();

            // Actualizar el estado local (sin recargar la página)
            if (esModoEditar) {
                // Reemplazar el producto en la lista
                setProductos(prev => prev.map(p => 
                    p.id === productoGuardado.id ? productoGuardado : p
                ));
            } else {
                // Añadir el nuevo producto a la lista
                setProductos(prev => [...prev, productoGuardado]);
            }

            setShowModal(false); // Cerrar el modal
            alert('¡Producto guardado exitosamente!');

        } catch (err) {
            alert(`Error al guardar: ${err.message}`);
        }
    };

    const handleShowAñadir = () => {
        setProductoAEditar(null); // Poner en modo "Añadir"
        setShowModal(true);
    };

    const handleShowEditar = (producto) => {
        setProductoAEditar(producto); // Poner en modo "Editar"
        setShowModal(true);
    };

    // Renderizado (condicional)
    if (cargando) return <h1 className="mb-4">Cargando productos...</h1>;
    if (error) return <h1 className="mb-4 text-danger">Error: {error}</h1>;

    // Renderizado principal
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestión de Productos</h1>
                {/* Botón para Añadir */}
                <Button variant="success" onClick={handleShowAñadir}>
                    Añadir Nuevo Producto
                </Button>
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
                    {productos.map(product => (
                        <tr key={product.id} className={product.stock < 5 ? 'table-warning' : ''}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.categoria.nombre}</td>
                            <td>{formatPeso(product.precio)}</td>
                            <td>{product.stock}</td>
                            <td>
                                {/* Botón para Editar */}
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => handleShowEditar(product)}
                                >
                                    Editar
                                </Button>
                                {/* Botón para Borrar */}
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Borrar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Renderizar el Modal (estará oculto por defecto) */}
            <CrearEditarProductoAdmin 
                show={showModal}
                onHide={() => setShowModal(false)}
                producto={productoAEditar}
                onSave={handleSave}
            />
        </>
    );
}