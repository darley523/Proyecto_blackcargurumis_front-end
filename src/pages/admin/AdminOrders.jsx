import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext'; // hook de autenticación

export function AdminOrders() {
    // Definir estados locales: pedidos, carga, error
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // Obtener token de autenticación desde el contexto
    const { token } = useAuth();

    // Función helper para formatear moneda (CLP)
    const formatPeso = (value) => {
        return value.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    // Función helper para formatear fecha (LocalDateTime de Java)
    const formatFecha = (fechaISO) => {
        // La fecha de Java (LocalDateTime) viene en formato ISO
        const fecha = new Date(fechaISO);
        // Formatea a "dd-MM-yyyy, HH:mm"
        return fecha.toLocaleString('es-CL', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };
    
    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        const fetchPedidos = async () => {
            // Validar existencia de token antes de llamar
            if (!token) return;

            try {
                // Llamada GET a la API de pedidos de admin
                const response = await fetch('http://localhost:8080/api/admin/pedidos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Enviar token JWT para autorización
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Manejar respuesta no exitosa (ej. 401, 403)
                if (!response.ok) {
                    throw new Error('Fallo al obtener los pedidos. Verificar permisos.');
                }

                const data = await response.json();
                // Guardar pedidos de la API en el estado
                setPedidos(data); 
                
            } catch (err) {
                console.error("Error al cargar pedidos:", err);
                setError(err.message);
            } finally {
                // Finalizar estado de carga
                setCargando(false);
            }
        };

        fetchPedidos();
    }, [token]); // Dependencia: re-ejecutar si el token cambia

    // Renderizado condicional basado en el estado de carga
    if (cargando) {
        return <h1 className="mb-4">Cargando pedidos...</h1>;
    }

    // Renderizado condicional en caso de error
    if (error) {
        return <h1 className="mb-4 text-danger">Error: {error}</h1>;
    }

    // Renderizado principal
    return (
        <>
            <h1 className="mb-4">Historial de Pedidos</h1>
            
            {/* Mostrar mensaje si no hay pedidos */}
            {pedidos.length === 0 ? (
                <p>Aún no se ha realizado ningún pedido.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th scope="col">ID Pedido</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Email Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Total</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterar sobre los pedidos reales del estado */}
                        {pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td>#{pedido.id}</td>
                                {/* Acceder a datos anidados de la entidad Usuario */}
                                <td>{pedido.usuario.nombre}</td>
                                <td>{pedido.usuario.email}</td>
                                <td>{formatFecha(pedido.fechaCreacion)}</td>
                                <td>{formatPeso(pedido.total)}</td>
                                <td>
                                    {/* Lógica de Badge basada en el estado del pedido */}
                                    <Badge bg={
                                        pedido.estado === 'PENDIENTE' ? 'warning' :
                                        pedido.estado === 'ENVIADO' ? 'info' :
                                        pedido.estado === 'ENTREGADO' ? 'success' : 'secondary'
                                    }>
                                        {pedido.estado}
                                    </Badge>
                                </td>
                                <td>
                                    <Button variant="secondary" size="sm">Ver Detalles</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}