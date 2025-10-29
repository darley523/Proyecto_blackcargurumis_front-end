import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Valor inicial para un producto nuevo
const formInicial = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoriaId: '', 
    imagenUrl: 'default.jpg' // Imagen por defecto
};

export function CrearEditarProductoAdmin({ show, onHide, producto, onSave }) {
    // Estado interno del formulario
    const [formData, setFormData] = useState(formInicial);
    
    // Estado para guardar las categorías del backend
    const [categorias, setCategorias] = useState([]);
    const [cargandoCategorias, setCargandoCategorias] = useState(true);

    // --- EFECTOS ---

    // Cargar categorías del backend
    useEffect(() => {
        if (show) {
            setCargandoCategorias(true);
            fetch('http://localhost:8080/api/categorias') // Endpoint público de categorías
                .then(res => res.json())
                .then(data => {
                    setCategorias(data);
                    setCargandoCategorias(false);
                })
                .catch(err => {
                    console.error("Error al cargar categorías:", err);
                    setCargandoCategorias(false);
                });
        }
    }, [show]); // Se ejecuta cada vez que 'show' cambia a true

    // Poblar el formulario cuando 'producto' cambia
    useEffect(() => {
        if (producto) {
            // Modo Editar: Cargar datos del producto
            setFormData({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                stock: producto.stock,
                categoriaId: producto.categoria.id, // Guardar solo el ID
                imagenUrl: producto.imagenUrl
            });
        } else {
            // Modo Añadir: Resetear al formulario inicial
            setFormData(formInicial);
        }
    }, [producto, show]); // Se re-ejecuta si el producto a editar cambia


    // Manejador genérico para cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejador para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar que se seleccionó una categoría
        if (!formData.categoriaId) {
            alert("Por favor, selecciona una categoría.");
            return;
        }
        
        // Llamar a la función de guardar (del componente padre)
        onSave(formData);
    };

    // Determinar el título
    const tituloModal = producto ? "Editar Producto" : "Añadir Nuevo Producto";

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{tituloModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* --- Campo Nombre --- */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* --- Campo Descripción --- */}
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* --- Campo Categoría --- */}
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            name="categoriaId"
                            value={formData.categoriaId}
                            onChange={handleChange}
                            required
                            disabled={cargandoCategorias}
                        >
                            <option value="">{cargandoCategorias ? "Cargando..." : "Selecciona una categoría"}</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    
                    {/* --- Fila Precio y Stock --- */}
                    <div className="row">
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Precio (CLP)</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </Form.Group>
                    </div>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}