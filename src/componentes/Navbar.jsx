import { Link } from 'react-router-dom';
import logo from '../img/logo_sin_fondo.png';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación

export function Navbar() {
    // Consume el estado global de autenticación
    const { user, logoutAction } = useAuth();

    /**
     * Manejador para el cierre de sesión
     */
    const handleLogout = () => {
        alert('Has cerrado sesión exitosamente.');
        logoutAction(); // Llama a la acción del contexto
    };

    return (
        <nav>
            <img src={logo} alt="Logo" className="logo"/>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                
                {user ? (
                    // Si el 'user' EXISTE (está logueado)
                    <>
                        <li><Link to="/compras">Compras</Link></li>
                        
                        {/* Muestra Admin solo si el rol es 'ROLE_ADMIN' */}
                        {user.roles && user.roles.includes('ROLE_ADMIN') && (
                            <li><Link to="/admin">Admin</Link></li>
                        )}
                        
                        <li>
                            <button onClick={handleLogout} className="navbar-logout-button">
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