// Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AddComponent from './components/AddComponent';
import UpdateComponent from './components/UpdateComponent';
import CountComponent from './components/CountComponent';


function Dashboard() {
  return (
    <div className='main-container'>
      <Container>
      <h1 className='text-center mt-3'>Dataneuron Admin</h1>
      <Row className='m-5'>
        <Col md={4}>
          <Card className='component-card'>
            <Card.Body className='text-center'>
      <AddComponent />
      </Card.Body>
      </Card>
      </Col>
      <Col md={4}>
          <Card className='component-card'>
            <Card.Body className='text-center'>
      <UpdateComponent />
      </Card.Body>
      </Card>
      </Col>
      <Col md={4}>
          <Card className='component-card'>
            <Card.Body className='text-center'>
      <CountComponent />
      </Card.Body>
      </Card>
      </Col>
      </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
