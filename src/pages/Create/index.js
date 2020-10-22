import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Create = () => {
  return(
    <Container fluid id="create-container">
      <Row noGutters className="h-100 align-items-center justify-content-center">
        <Col>
          <section id="create-box" className="text-center col-md-6 mx-auto">
            <header className="mb-5">
              <img src="../img/logo-dark.png" alt="Logo" />
            </header>
            <Form id="create-form">
              <Form.Group>
                <Form.Label>Criar transação</Form.Label>
                <Form.Control
                  type="number"
                  id="transaction"
                  placeholder="R$"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo de transação</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Entrada"
                    id="in"
                  />
                  <Form.Check
                    type="radio"
                    label="Saída"
                    id="out"
                  />
              </Form.Group>
              <Form.Group>
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
              </Form.Group>
              <Form.Group>
                <Form.Label>Descreva sua transação</Form.Label>
                <Form.Control as="textarea" rows={4}/>
              </Form.Group>
              <Form.Row>
                <Button type="submit">Cancela</Button>
                <Button type="cancel">Confirma</Button>
              </Form.Row>
            </Form>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Create;
