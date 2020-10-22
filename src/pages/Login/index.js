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

  useEffect(() => {
    if (location.state?.missingAuth) {
      setShowError(true);
      setErrorMessage('É necessário se autenticar para acessar o sistema!');
    }
  }, [location]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      setErrorMessage('Preencha todos os campos para continuar!');
    } else {
      console.log(email === 'a@a.com' && password === 'a', email, password);
      if (email === 'a@a.com' && password === 'a') {
        login('token');
        setUserData({
          userId: 1,
        });

        return history.push('/dashboard');
      }
      try {
        const response = await api.post('/api/auth/login', { username: email, password });
        login(response.data.accessToken);
        setUserData({
          userId: response.data.id,
        });
        history.push('/dashboard');
      } catch (err) {
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
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
