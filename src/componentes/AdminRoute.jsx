
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export function AdminRoute() {
    const { user, token } = useAuth();

    // Revisa si el usuario está autenticado Y si tiene el rol de ADMIN
    const esAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/login" replace />;
    }

    if (!esAdmin) {
        // Si hay token pero NO es admin, redirige al inicio
        return <Navigate to="/" replace />;
    }

    // Si es admin, muestra la página solicitada
    return <Outlet />;
}