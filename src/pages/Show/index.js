import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './styles.css';
import api from '../../services/api';
import { getUserData } from '../../services/auth';

const Show = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = getUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/transactions`);

        setTransactions(response.data);
      } catch (err) {
        console.log('ERROR GET TRANSACTIONS');
      }
    };

    fetchData();
  }, [userId]);

  const createTableRows = () => transactions.map((transaction) => (
    <tr key={transaction.id}>
      <td>{transaction.value}</td>
      <td>{transaction.description}</td>
      <td>{transaction.flow}</td>
    </tr>
  ));

  return (
    <Container fluid id="show-container">
      <Col xs={6}>
        <h1>Transações</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descrição</th>
              {/* <th>Categoria</th> */}
              <th>Fluxo</th>
            </tr>
          </thead>
          <tbody>
            {createTableRows()}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
};

export default Show;
