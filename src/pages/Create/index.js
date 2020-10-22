import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';

import './styles.css';
import api from '../../services/api';
import { getUserData } from '../../services/auth';

const Create = () => {
  const history = useHistory();
  const [value, setValue] = useState();
  const [flow, setFlow] = useState();
  const [description, setDescription] = useState();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { userId } = getUserData();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!value || !flow || !description) {
      setShowError(true);
      setErrorMessage('Preencha todos os campos para continuar!');
    } else {
      try {
        const response = await api.post('/api/transactions', {
          description, flow, value, user: { id: userId },
        });

        if (response.data.id) {
          history.push('/dashboard?show');
        }
      } catch (err) {
        setShowError(true);
        setErrorMessage('Ocorreu um erro ao criar sua transação!');
      }
    }
  };

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
        <Form id="create-form" onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Criar transação</Form.Label>
            <Form.Control
              type="number"
              id="transaction"
              placeholder="R$"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de transação</Form.Label>
            <Form.Check
              type="radio"
              label="Entrada"
              name="flow"
              checked={flow === 'IN' && true}
              onChange={() => setFlow('IN')}
            />
            <Form.Check
              type="radio"
              label="Saída"
              name="flow"
              checked={flow === 'OUT' && true}
              onChange={() => setFlow('OUT')}
            />
          </Form.Group>
          {/* <Form.Group>

            ADICIONAR NOVAMENTE APÓS FINALIZAR LÓGICA DE CATEGORIA NO BACKEND

            <Form.Label>Selecione uma categoria</Form.Label>
            <Form.Control
              as="select"
              id="category"
              placeholder="Selecione uma categoria..."
            >
              <option>Aluguel</option>
              <option>Transporte</option>
              <option>Lazer</option>
              <option>Alimentação</option>
              <option>Contas</option>
              <option>Salário</option>
              <option>Empréstimo</option>
              <option>Freelancer</option>
              <option>Outros</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Descreva sua transação</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Button type="submit">Criar</Button>
            {/* <Button type="button">Confirmar</Button> */}
          </Form.Row>
        </Form>
      </Col>
    </Container>
  );
};

export default Create;
