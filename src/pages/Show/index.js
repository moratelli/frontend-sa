import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

import "./styles.css";
import api from "../../services/api";
import { getUserData } from "../../services/auth";
import thanosMeme from "../../img/thanos.jpg";

const Show = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId, name } = getUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/transactions`);

        setTransactions(response.data || []);
      } catch (err) {
        console.log("ERROR GET TRANSACTIONS");
      }
    };

    fetchData();
  }, [userId]);

  const createTableRows = () =>
    transactions.reverse().map((transaction) => (
      <tr key={transaction.id}>
        <td>R$ {transaction.value}</td>
        <td>{transaction.description}</td>
        <td>{transaction.category}</td>
        <td>{transaction.flow}</td>
      </tr>
    ));

  const calculateSpending = () => {
    const lastTenTransactions = transactions.reverse().slice(0, 10);

    console.log(lastTenTransactions);

    let inSum = 0;
    let outSum = 0;

    lastTenTransactions.forEach((transaction) => {
      if (transaction.flow === "IN") inSum += transaction.value;
      if (transaction.flow === "OUT") outSum += transaction.value;
    });

    return (
      <>
        <br></br>
        <h4>
          <span role="img" aria-label="money-flying">
            💸
          </span>{" "}
          Gastou R$ {outSum}
        </h4>
        <h6>A categoria em que mais gastou foi abc!</h6>
        <br></br>
        <h4>
          <span role="img" aria-label="money-flying">
            💰
          </span>{" "}
          Recebeu R$ {inSum}
        </h4>
        <h6>A categoria em que mais recebeu foi abc!</h6>
        <br></br>
        {inSum > outSum ? (
          <>
            <h3>
              Parabéns!{" "}
              <span role="img" aria-label="confetti">
                🎉
              </span>{" "}
            </h3>
            <h5>Você tem recebido mais do que gasto. Continue assim!</h5>
          </>
        ) : outSum > inSum ? (
          <>
            <h3>
              Cuidado!{" "}
              <span role="img" aria-label="warning-sign">
                ⚠️
              </span>{" "}
            </h3>
            <h5>
              Você tem gasto mais do que recebido. Tente controlar mais os seus
              gastos!
            </h5>
          </>
        ) : (
          <img
            src={thanosMeme}
            alt="Perfectly balanced!"
            style={{ maxWidth: 500 }}
          />
        )}
      </>
    );
  };

  return (
    <Container fluid id="show-container">
      <Row noGutters className="h-100 w-100 align-items-center">
        <Col xs={6}>
          <h1>Olá, {name}! 👋</h1>
          <br></br>
          <h3>Nas suas últimas dez transações, percebi que você...</h3>
          {calculateSpending()}
        </Col>
        <Col xs={6}>
          <h2>Últimos registros</h2>
          <br></br>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Fluxo</th>
              </tr>
            </thead>
            <tbody>{createTableRows()}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Show;
