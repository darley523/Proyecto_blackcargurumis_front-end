
import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export function DetallesPedidoModal({ pedido, show, onHide, onStatusChange }) {
    const [estado, setEstado] = useState(pedido?.estado || '');
    const { token } = useAuth();

    useEffect(() => {
        if (pedido) {
            setEstado(pedido.estado);
        }
    }, [pedido]);

    if (!pedido) {
        return null;
    }

    const handleGuardar = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/pedidos/${pedido.id}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estado })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado del pedido');
            }

            onStatusChange(pedido.id, estado);

            onHide(); // Cerrar modal
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const formatPeso = (value) => {
        return value.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Pedido #{pedido.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Información del Cliente</h5>
                <p><strong>Nombre:</strong> {pedido.usuario.nombre}</p>
                <p><strong>Email:</strong> {pedido.usuario.email}</p>

                <h5>Productos</h5>
                <ListGroup>
                    {pedido && pedido.items ? (
                        pedido.items.map(item => (
                            <ListGroup.Item key={item.id}>
                                {item.producto.nombre} - {item.cantidad} x {formatPeso(item.precioUnitario)}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <p>Cargando items...</p>
                    )}
                </ListGroup>

                <h5 className="mt-3">Total del Pedido: {formatPeso(pedido.total)}</h5>

                <hr />

                <h5>Estado del Pedido</h5>
                <Form.Group>
                    <Form.Label>Cambiar estado</Form.Label>
                    <Form.Control as="select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="ENVIADO">Enviado</option>
                        <option value="ENTREGADO">Entregado</option>
                    </Form.Control>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleGuardar}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
