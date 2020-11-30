import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";

import "./styles.css";
import api from "../../services/api";
import { getUserData } from "../../services/auth";
import categoryParser from "../../utils/categoryParser";
import thanosMeme from "../../img/thanos.jpg";

const Show = () => {
  const [transactions, setTransactions] = useState([]);
  const [lastTenTransactions, setLastTenTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage] = useState(10);
  const { userId, name } = getUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/transactions?page=${currentPage}&size=${itemsPerPage}`);

        if (lastTenTransactions.length === 0) setLastTenTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.log("ERROR GET TRANSACTIONS");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [userId, currentPage, itemsPerPage, lastTenTransactions]);

  const createTableRows = () => transactions.map((transaction) => (
    <tr
      key={transaction.id}
      style={
          transaction.flow === "IN"
            ? { backgroundColor: "#e2f5ee", color: "#1fab89" }
            : { backgroundColor: "#fae9e8", color: "#ff322b" }
        }
    >
      <td>
        R$
        {" "}
        {transaction.value}
      </td>
      <td>{transaction.description}</td>
      <td>{categoryParser(transaction.category)}</td>
      <td>
        {new Date(transaction.createdAt).toLocaleDateString()}
        {" "}
      </td>
    </tr>
  ));

  const calculateSpending = () => {
    let inSum = 0;
    let outSum = 0;
    const categoriesIn = {};
    const categoriesOut = {};

    lastTenTransactions.forEach((transaction) => {
      if (transaction.flow === "IN") {
        inSum += transaction.value;
        const categoryValue = categoriesIn[transaction.category] || 0;
        categoriesIn[transaction.category] = categoryValue + transaction.value;
      }

      if (transaction.flow === "OUT") {
        outSum += transaction.value;
        const categoryValue = categoriesOut[transaction.category] || 0;
        categoriesOut[transaction.category] = categoryValue + transaction.value;
      }
    });

    const topCategoryIn = Object.keys(categoriesIn).reduce(
      (a, b) => (categoriesIn[a] > categoriesIn[b] ? a : b), 0,
    );
    const topCategoryOut = Object.keys(categoriesOut).reduce(
      (a, b) => (categoriesOut[a] > categoriesOut[b] ? a : b), 0,
    );

    return (
      <>
        <br />
        <h4>
          <span role="img" aria-label="money-flying">
            💸
          </span>
          {" "}
          Gastou R$
          {" "}
          {outSum}
        </h4>
        {!!topCategoryOut
        && (
        <h6>
          A categoria em que mais gastou foi
          {" "}
          <span className="font-weight-bold">
            {categoryParser(topCategoryOut)}
          </span>
          !
        </h6>
        )}
        <br />
        <h4>
          <span role="img" aria-label="money-flying">
            💰
          </span>
          {" "}
          Recebeu R$
          {" "}
          {inSum}
        </h4>
        {!!topCategoryIn
        && (
        <h6>
          A categoria em que mais recebeu foi
          {" "}
          <span className="font-weight-bold">
            {categoryParser(topCategoryIn)}
          </span>
          !
        </h6>
        )}
        <br />

        {inSum > outSum && (
          <>
            <h3>
              Parabéns!
              {" "}
              <span role="img" aria-label="confetti">
                🎉
              </span>
              {" "}
            </h3>
            <h5>Você tem recebido mais do que gasto. Continue assim!</h5>
          </>
        )}

        {outSum > inSum && (
          <>
            <h3>
              Cuidado!
              {" "}
              <span role="img" aria-label="warning-sign">
                ⚠️
              </span>
              {" "}
            </h3>
            <h5>
              Você tem gasto mais do que recebido. Tente controlar mais os seus
              gastos!
            </h5>
          </>
        )}

        {inSum === outSum && (
          <img
            src={thanosMeme}
            alt="Perfectly balanced!"
            // style={{ maxWidth: 500 }}
            style={{
              width: "80%",
              height: "auto",
              alignSelf: "center",
            }}
          />
        )}
      </>
    );
  };

  const paginationItems = () => {
    const items = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </Pagination.Item>,
      );
    }

    return items;
  };

  if (isLoading) {
    return (
      <div id="loading-container">
        <Spinner animation="border" role="status" variant="success">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid id="show-container">
      <Row noGutters className="align-items-center">
        <Col xs={5} className="d-flex flex-column" id="welcome-message">
          <h1>
            Olá,
            {" "}
            {name}
            ! 👋
          </h1>
          <br />
          <h3>Nas suas últimas dez transações, percebi que você...</h3>
          {calculateSpending()}
        </Col>

        <Col xs={6} id="latest-transactions">
          <Row className="d-flex justify-content-between">
            <h2>Últimos registros</h2>

            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              {paginationItems()}
              <Pagination.Next
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>
          </Row>

          <br />
          <Table responsive size="sm">
            <thead>
              <tr>
                <th scope="col" style={{ width: 80 }}>Valor</th>
                <th scope="col" style={{ width: 200 }}>Descrição</th>
                <th scope="col">Categoria</th>
                <th scope="col">Data</th>
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
