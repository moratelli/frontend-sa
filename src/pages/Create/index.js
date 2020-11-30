/* eslint-disable max-len */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

import "./styles.css";
import api from "../../services/api";
import { getUserData } from "../../services/auth";

const Create = () => {
  const history = useHistory();
  const [value, setValue] = useState();
  const [flow, setFlow] = useState("IN");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userId } = getUserData();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!value || !flow || !description || !category) {
      setShowError(true);
      setErrorMessage("Preencha todos os campos para continuar!");
    } else {
      try {
        const response = await api.post("/api/transactions", {
          description,
          flow,
          value,
          category,
          user: { id: userId },
        });

        if (response.data.id) {
          history.push("/dashboard?show");
        }
      } catch (err) {
        setShowError(true);
        setErrorMessage("Ocorreu um erro ao criar sua transação!");
      }
    }
  };

  const optionsIn = [
    { value: "SALARIO", label: "Salário" },
    { value: "INVESTIMENTO", label: "Investimento" },
    { value: "EMPRESTIMO", label: "Empréstimo" },
    { value: "OUTROS", label: "Outros" },
  ];

  const optionsOut = [
    { value: "ALIMENTACAO", label: "Alimentação" },
    { value: "ASSINATURAS_E_SERVICOS", label: "Assinaturas e serviços" },
    { value: "EDUCACAO", label: "Educação" },
    { value: "IMPOSTOS_E_TAXAS", label: "Impostos e taxas" },
    { value: "LAZER_E_HOBBIES", label: "Lazer e hobbies" },
    { value: "MORADIA", label: "Moradia" },
    { value: "PETS", label: "Pets" },
    { value: "ROUPAS", label: "Roupas" },
    { value: "SAUDE", label: "Saúde" },
    { value: "TRANSPORTE", label: "Transporte" },
    { value: "OUTROS", label: "Outros" },
  ];

  return (
    <Container fluid id="create-container">
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
        <h1>Criar transação</h1>
        <br />
        <Form id="create-form" onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              id="valor"
              placeholder="R$"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de transação</Form.Label>
            <Form.Check
              type="radio"
              id="entrada"
              label="Entrada"
              name="flow"
              checked={flow === "IN" && true}
              onChange={() => {
                setCategory("");
                setFlow("IN");
              }}
            />
            <Form.Check
              type="radio"
              label="Saída"
              name="flow"
              id="saida"
              checked={flow === "OUT" && true}
              onChange={() => {
                setCategory("");
                setFlow("OUT");
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Selecione uma categoria</Form.Label>
            <Form.Control
              as="select"
              id="categoria"
              placeholder="Selecione uma categoria..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled selected>
                Selecione
              </option>
              {flow === "IN"
                ? optionsIn.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))
                : optionsOut.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Descreva sua transação</Form.Label>
            <Form.Control
              as="input"
              id="descricao"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Button id="create-button" type="submit">
              Criar
            </Button>
          </Form.Row>
        </Form>
      </Col>
    </Container>
  );
};

export default Create;
