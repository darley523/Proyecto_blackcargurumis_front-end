import { NavLink, Outlet, Link } from 'react-router-dom';
import { Nav, Dropdown } from 'react-bootstrap';
import logoSinFondo from '../../img/logo_sin_fondo.png';    
import './admin_estilos.css'; //

export function AdminLayout() {
    return (
        <div className="admin-layout d-flex">
            {/* --- Menú Lateral (Sidebar) --- */}
            <div className="sidebar d-flex flex-column flex-shrink-0 p-3">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                    <img src={logoSinFondo} alt="Logo" height="100" />
                </Link>
                <hr />
                <Nav variant="pills" className="flex-column mb-auto" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link as={NavLink} to="/admin" end>Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link as={NavLink} to="/admin/usuarios">Usuarios</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link as={NavLink} to="/admin/pedidos">Pedidos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link as={NavLink} to="/admin/productos">Productos</Nav.Link>
                    </Nav.Item>
                </Nav>
                <hr />

                <Dropdown>
                    <Dropdown.Toggle
                        variant="link"
                        id="dropdown-admin"
                        className="d-flex align-items-center text-decoration-none text-dark p-0"
                    >
                        <strong>Admin</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="text-small shadow">
                        <Dropdown.Item href="#">Perfil</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/">Cerrar Sesión</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* --- Contenido Principal --- */}
            <main className="content p-4 flex-grow-1">
                <Outlet />
            </main>
        </div>
    );
}
