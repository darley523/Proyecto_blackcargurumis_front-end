import { Table, Button } from 'react-bootstrap';

export function AdminProducts() {
  // Datos de ejemplo
  const products = [
    { id: 'P001', nombre: 'Amigurumi Gato Negro', precio: 12000, stock: 15 },
    { id: 'P002', nombre: 'Chaleco Tejido', precio: 25000, stock: 8 },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        <Button variant="success">Añadir Nuevo Producto</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">ID Producto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>${product.precio.toLocaleString('es-CL')}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Borrar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
