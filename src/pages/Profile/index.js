/* eslint-disable max-len */
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

import "./styles.css";
import api from "../../services/api";
import { getUserData, setUserData } from "../../services/auth";

const Create = () => {
  const { userId, name: currentName, email: currentEmail } = getUserData();
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    setShowSuccess(false);
    setShowError(false);
    e.preventDefault();

    if (!name || !email) {
      setShowError(true);
      setErrorMessage("Preencha todos os campos para continuar!");
      return;
    }

    if ((password || confirmPassword) && password !== confirmPassword) {
      setShowError(true);
      setErrorMessage("As duas senhas devem ser iguais!");
      return;
    }

    try {
      let response;

      if (!password) {
        response = await api.put(`/api/users/${userId}`, {
          name,
          email,
        });
      } else {
        response = await api.put(`/api/users/${userId}`, {
          name,
          email,
          password,
        });
      }

      if (response.data.id) {
        setUserData({
          userId: response.data.id,
          name: response.data.name,
          email: response.data.email,
        });

        setShowSuccess(true);
        setSuccessMessage("Dados atualizados com sucesso!");

        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      if (err.response.data === "O email inserido já está em uso") {
        setShowError(true);
        setErrorMessage(err.response.data);
        return;
      }

      setShowError(true);
      setErrorMessage("Ocorreu um erro ao criar sua transação!");
    }
  };

  return (
    <Container fluid id="profile-container">
      <Col xs={6}>
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
        <h1>Editar perfil</h1>
        <br />
        <Form id="create-form" onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              id="nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Nova senha</Form.Label>
              <Form.Control
                id="senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Confirmar nova senha</Form.Label>
              <Form.Control
                id="confirmar-senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button id="save-button" type="submit">
              Salvar
            </Button>
          </Form.Row>
        </Form>
      </Col>
    </Container>
  );
};

export default Create;
