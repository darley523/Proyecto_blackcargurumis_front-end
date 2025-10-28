import { Row, Col, Card } from 'react-bootstrap';

export function Dashboard() {
  return (
    <>
      <h1 className="mb-4">Dashboard</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Usuarios Registrados</Card.Title>
              {/* En el futuro, este "15" vendrá de tu base de datos */}
              <Card.Text className="fs-2">15</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pedidos Totales</Card.Title>
              <Card.Text className="fs-2">42</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ingresos del Mes</Card.Title>
              <Card.Text className="fs-2">$450.000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Aquí puedes añadir más gráficos o resúmenes */}
    </>
  );
}