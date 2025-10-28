import { Table, Button, Badge } from 'react-bootstrap';

export function AdminOrders() {
  // Datos de ejemplo
  const orders = [
    { id: 1024, cliente: 'Ana Pérez', fecha: '2024-05-20', total: 22500, estado: 'Entregado' },
    { id: 1025, cliente: 'Carlos Gómez', fecha: '2024-05-22', total: 15000, estado: 'En proceso' },
  ];

  return (
    <>
      <h1 className="mb-4">Historial de Pedidos</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">ID Pedido</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.cliente}</td>
              <td>{order.fecha}</td>
              <td>${order.total.toLocaleString('es-CL')}</td>
              <td>
                {order.estado === 'Entregado' ? (
                  <Badge bg="success">Entregado</Badge>
                ) : (
                  <Badge bg="warning" text="dark">En proceso</Badge>
                )}
              </td>
              <td>
                <Button variant="secondary" size="sm">Ver Detalles</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}