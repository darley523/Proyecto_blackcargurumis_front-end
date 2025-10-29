import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext'; // Importar hook de autenticación

export function Dashboard() {
    // Definir estado para guardar las estadísticas
    const [stats, setStats] = useState({
        totalUsuarios: 0,
        totalPedidos: 0,
        totalIngresos: 0
    });
    
    // Definir estado de carga
    const [cargando, setCargando] = useState(true);
    
    // Obtener token de autenticación desde el contexto
    const { token } = useAuth();

    // Función helper para formatear moneda (CLP)
    const formatPeso = (value) => {
        return value.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        const fetchDashboardStats = async () => {
            // Validar existencia de token antes de llamar
            if (!token) return;

            setCargando(true);
            try {
                // Definir las cabeceras de autenticación
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                // Definir las dos llamadas a la API
                const fetchUsuarios = fetch('http://localhost:8080/api/admin/usuarios', { headers });
                const fetchPedidos = fetch('http://localhost:8080/api/admin/pedidos', { headers });

                // Ejecutar ambas llamadas en paralelo
                const [usuariosResponse, pedidosResponse] = await Promise.all([
                    fetchUsuarios,
                    fetchPedidos
                ]);

                if (!usuariosResponse.ok || !pedidosResponse.ok) {
                    throw new Error('Error al cargar los datos del dashboard');
                }

                const usuariosData = await usuariosResponse.json();
                const pedidosData = await pedidosResponse.json();

                // Calcular los totales
                const totalUsuarios = usuariosData.length;
                const totalPedidos = pedidosData.length;
                
                // Usar 'reduce' para sumar el total de cada pedido
                const totalIngresos = pedidosData.reduce((acumulador, pedido) => {
                    return acumulador + pedido.total;
                }, 0); // 0 es el valor inicial

                //  Guardar las estadísticas en el estado
                setStats({
                    totalUsuarios,
                    totalPedidos,
                    totalIngresos
                });

            } catch (err) {
                console.error("Error cargando el dashboard:", err);
            } finally {
                setCargando(false);
            }
        };

        fetchDashboardStats();
    }, [token]); // Dependencia: re-ejecutar si el token cambia

    // Renderizado principal
    return (
        <>
            <h1 className="mb-4">Dashboard</h1>
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Usuarios Registrados</Card.Title>
                            {/* Mostrar el dato real o "Cargando..." */}
                            <Card.Text className="fs-2">
                                {cargando ? '...' : stats.totalUsuarios}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Pedidos Totales</Card.Title>
                            <Card.Text className="fs-2">
                                {cargando ? '...' : stats.totalPedidos}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Ingresos Totales</Card.Title>
                            <Card.Text className="fs-2">
                                {/* Usar el helper de formato de moneda */}
                                {cargando ? '...' : formatPeso(stats.totalIngresos)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}