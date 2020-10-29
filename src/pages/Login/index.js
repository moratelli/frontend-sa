import React, { useState, useEffect } from 'react';
import {
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import api from '../../services/api';
import { login, setUserData } from '../../services/auth';

import './styles.css';

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (location.state?.missingAuth) {
      setShowError(true);
      setErrorMessage('É necessário se autenticar para acessar o sistema!');
    }
    if (location.state?.successMessage) {
      setShowSuccess(true);
      setSuccessMessage(location.state?.successMessage);
    }
  }, [location]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        const response = await api.post('/api/auth/login', { username: email, password });
        login(response.data.accessToken);
        setUserData({
          userId: response.data.id,
        });
        setValidated(true);
        history.push('/dashboard');
      } catch (err) {
        setValidated(false);
        setShowError(true);
        setErrorMessage('Email e/ou senha inválido!');
      }
    }
  };

  return (
    <Container fluid id="login-container">
      <Row noGutters className="h-100 align-items-center">
        <Col md="7">
          <picture id="login-picture"><img src="" alt="stonks" /></picture>
        </Col>
        <Col md="5">
          <section id="login-box" className="text-center col-md-6 mx-auto">
            <header className="mb-5">
              <img src="../img/logo-dark.png" alt="Logo" />
            </header>
            <Form
              id="login-form"
              onSubmit={handleFormSubmit}
              noValidate
              validated={validated}
            >
              <Collapse in={showError} timeout={100}>
                <div>
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setShowError(false)}
                  >
                    {errorMessage}
                  </Alert>
                </div>
              </Collapse>
              <Collapse in={showSuccess} timeout={100}>
                <div>
                  <Alert
                    variant="success"
                    dismissible
                    onClose={() => setShowSuccess(false)}
                  >
                    {successMessage}
                  </Alert>
                </div>
              </Collapse>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe um e-mail válido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Infome sua senha.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-5">
                <Button
                  variant="info"
                  block
                  className="font-weight-bold"
                  type="submit"
                >
                  LOGIN
                </Button>
              </Form.Group>
            </Form>
            <footer className="text-center">
              <Link to="/register">Não possui uma conta?</Link>
            </footer>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
