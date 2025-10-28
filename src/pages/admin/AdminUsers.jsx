import { Table, Button } from 'react-bootstrap';

export function AdminUsers() {
  
  const users = [
    { id: 1, nombre: 'Ana Pérez', email: 'ana.perez@example.com', rol: 'Cliente' },
    { id: 2, nombre: 'Carlos Gómez', email: 'carlos.gomez@example.com', rol: 'Cliente' },
    { id: 3, nombre: 'Admin Principal', email: 'admin@blackcatgurumis.cl', rol: 'Administrador' },
  ];

  return (
    <>
      <h1 className="mb-4">Gestión de Usuarios</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm" disabled={user.rol === 'Administrador'}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
