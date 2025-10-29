import { Link } from 'react-router-dom';
//import logo from '../img/logo_sin_fondo.png';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación

export function Navbar() {
    // Consume el estado global de autenticación
    const { user, logoutAction } = useAuth();

    // Determina si el usuario tiene rol de admin cubriendo varias formas comunes
    const isAdmin = Boolean(user && (
        (Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN')) ||
        (typeof user.role === 'string' && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN')) ||
        (Array.isArray(user.authorities) && (user.authorities.includes('ROLE_ADMIN') || user.authorities.some(a => a.authority === 'ROLE_ADMIN'))) ||
        user.isAdmin === true
    ));

    /**
     * Manejador para el cierre de sesión
     */
    const handleLogout = () => {
        alert('Has cerrado sesión exitosamente.');
        logoutAction(); // Llama a la acción del contexto
    };

    return (
        <nav>
            <img src="/img/logo_sin_fondo.png" alt="Logo" className="logo"/>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/compras">Compras</Link></li>
                
                {user ? (
                    // Si el 'user' EXISTE (está logueado)
                    <>
                        
                        
                        {/* Muestra Admin solo si el rol es 'ROLE_ADMIN' */}
                        {isAdmin && (
                            <li><Link to="/admin">Admin</Link></li>
                        )}
                        
                        <li>
                            <button type="button" onClick={handleLogout} className="navbar-logout-button" aria-label="Cerrar sesión">
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                ) : (
                    // Si el 'user' NO EXISTE (no está logueado)
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}