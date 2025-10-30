import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext'; // Importar hook de autenticación

export function AdminUsers() {
    // Definir estados locales: usuarios, carga, error
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Obtener token de autenticación desde el contexto
    const { token } = useAuth();

    // Función helper para formatear la lista de roles
    const formatRoles = (roles) => {
        // La entidad 'Usuario' tiene una lista de 'Rol'
        return roles.map(rol => {
            // Traducir roles del backend a nombres legibles
            if (rol.nombre === 'ROLE_ADMIN') return 'Administrador';
            if (rol.nombre === 'ROLE_USER') return 'Cliente';
            return rol.nombre; // Mostrar el nombre por defecto si no coincide
        }).join(', '); // Unir si un usuario tiene múltiples roles
    };

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            // Validar existencia de token antes de llamar
            if (!token) return;

            try {
                // Llamada GET a la API de usuarios de admin
                const response = await fetch('http://localhost:8080/api/admin/usuarios', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Enviar token JWT para autorización
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Manejar respuesta no exitosa
                if (!response.ok) {
                    throw new Error('Fallo al obtener los usuarios. Verificar permisos.');
                }

                const data = await response.json();
                // Guardar usuarios de la API en el estado
                setUsuarios(data);

            } catch (err) {
                console.error("Error al cargar usuarios:", err);
                setError(err.message);
            } finally {
                // Finalizar estado de carga
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, [token]); // Dependencia: re-ejecutar si el token cambia

    const handleDelete = async (userId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/admin/usuarios/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el usuario');
                }

                setUsuarios(usuarios.filter(user => user.id !== userId));
                alert("Usuario eliminado con éxito.");

            } catch (err) {
                console.error("Error al eliminar usuario:", err);
                alert(err.message);
            }
        }
    };

    // Renderizado condicional basado en el estado de carga
    if (cargando) {
        return <h1 className="mb-4">Cargando usuarios...</h1>;
    }

    // Renderizado condicional en caso de error
    if (error) {
        return <h1 className="mb-4 text-danger">Error: {error}</h1>;
    }

    // Renderizado principal
    return (
        <>
            <h1 className="mb-4">Gestión de Usuarios</h1>
            
            {usuarios.length === 0 ? (
                <p>No hay usuarios registrados.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th scope="col"># ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterar sobre los usuarios reales del estado */}
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                {/* Usar la función helper para mostrar roles */}
                                <td>{formatRoles(user.roles)}</td>
                                <td>
                                    {/* Lógica para no permitir borrar a un admin */}
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        disabled={user.roles.some(rol => rol.nombre === 'ROLE_ADMIN')}
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Borrar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}