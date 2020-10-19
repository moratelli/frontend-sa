import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './styles.css';

const Register = () => (
  <Container fluid id="register-container">
    <Row noGutters className="h-100 align-items-center justify-content-center">
      <Col>
        <section id="login-box" className="text-center col-md-6 mx-auto">
          <header className="mb-5">
            <img src="../img/logo-dark.png" alt="Logo" />
          </header>
          <Form id="register-form">
            <Alert
              variant="danger"
              className="d-none"
              id="error-div"
            >
              Whops! Os dados informados são inválidos.
            </Alert>
            <Form.Group>
              <Form.Control
                type="email"
                id="email"
                placeholder="Login"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Button
                variant="info"
                block
                className="font-weight-bold"
                id="login-button"
                type="submit"
              >
                REGISTRAR
              </Button>
            </Form.Group>
          </Form>
        </section>
        <footer className="text-center">
          <a href="/">Já possui uma conta?</a>
        </footer>
      </Col>
    </Row>
  </Container>
);

export default Register;
