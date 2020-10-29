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
  const [flow, setFlow] = useState('IN');
  const [category, setCategory] = useState();
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
          description, flow, value, category, user: { id: userId },
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

  const optionsOut = [
    { value: 'ROUPAS', label: 'Roupas' },
    { value: 'COMIDA', label: 'Comida' },
    { value: 'TRANSPORTE', label: 'Transporte' },
  ];

  const optionsIn = [
    { value: 'SALARIO', label: 'Salário' },
    { value: 'APOSTA', label: 'Aposta' },
    { value: 'FREELANCE', label: 'Freelance' },
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
              id="entrada"
              label="Entrada"
              name="flow"
              checked={flow === 'IN' && true}
              onChange={() => setFlow('IN')}
            />
            <Form.Check
              type="radio"
              label="Saída"
              name="flow"
              id="saída"
              checked={flow === 'OUT' && true}
              onChange={() => setFlow('OUT')}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Selecione uma categoria</Form.Label>
            <Form.Control
              as="select"
              placeholder="Selecione uma categoria..."
              onChange={(e) => setCategory(e.target.value)}
            >
              {flow === 'IN'
                ? optionsIn.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)
                : optionsOut.map((item) => <option key={item.value} value={item.value}>{item.label}</option>) }
            </Form.Control>
          </Form.Group>
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
          </Form.Row>
        </Form>
      </Col>
    </Container>
  );
};

export default Create;
