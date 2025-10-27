import { Link } from 'react-router-dom';
import logo from '../img/logo_sin_fondo.png';

export function Navbar() {
  return (

    <nav>
        <img src={logo} alt="Logo" className="logo"/>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/compras">Compras</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>    
    </nav>
    );
}
