<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Form,Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Bar, Pie, HorizontalBar, Line } from 'react-chartjs-2';
import api from '../../services/api';
import { getUserData } from '../../services/auth';
=======
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Pie } from "react-chartjs-2";
import api from "../../services/api";
import { getUserData } from "../../services/auth";
>>>>>>> 0598a71e5ff371fc2c6456ba4d9a6fa9b67ee4c2

import "./styles.css";

 const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [flowChartData, setFlowChartData] = useState([]);
  const [inCategoryChartData, setInCategoryChartData] = useState([])
  const { userId } = getUserData();

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

  useEffect(() => {
    const inTransactions = transactions.filter((t) => t.flow === "IN");
    const totalIn = inTransactions.reduce((total, cur) => total + cur.value, 0);

    const outTransactions = transactions.filter((t) => t.flow === "OUT");
    const totalOut = outTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );

    setFlowChartData([totalIn, totalOut]);
  }, [transactions]);

  useEffect(() => {
    const salarioTransactions = transactions.filter((t) => t.category === 'SALARIO');
    const totalSalario = salarioTransactions.reduce((total, cur) => total + cur.value, 0);

    const apostaTransactions = transactions.filter((t) => t.category === 'APOSTA');
    const totalAposta = apostaTransactions.reduce((total, cur) => total + cur.value, 0);

    const freelanceTransactions = transactions.filter((t) => t.category === 'FREELANCE');
    const totalFreelance = freelanceTransactions.reduce((total, cur) => total + cur.value, 0);

    setInCategoryChartData([totalSalario, totalAposta, totalFreelance]);
  }, [transactions]);

  return (
    <Container fluid id="report-container">

      <h1>Relatórios</h1>
      <br />
      <select>
          <option value="InOutTotal">Total de Entradas e Saídas</option>
          <option value="InCategories">Total de Entradas por Categoria</option>
          <option value="OutCategories">Total de Saídas por Categoria</option>
          <option value="InDateTime">Total de Entradas por Data</option>
          <option value="OutDateTime">Total de Saídas por Data</option>
          <option value="InOutCategories">Total de Entradas e Saídas por Categoria</option>
          <option value="InOutDateTime">Total de Entradas e Saídas por Data</option>
      </select>
      <br />
      <Form.Group>
        <Form.Row>
          <Form.Check
            type="radio"
            id="chart"
            label="Pizza"
            name="flow"
          />

          <Form.Check
            type="radio"
            id="chart"
            label="Barra Horizontal"
            name="flow"
          />
          <Form.Check
            type="radio"
            id="chart"
            label="Barra Vertical"
            name="flow"
          />
          <Form.Check
            type="radio"
            id="chart"
            label="Linha Horizontal"
            name="flow"
          />
        </Form.Row>
      </Form.Group>
      <div>

        <Pie
          options={{
            tooltips: {
              enabled: true,
              mode: "single",
              callbacks: {
                label(tooltipItems, data) {
                  return `R$ ${data.datasets[0].data[tooltipItems.index]}`;
                },
              },
            },
          }}
          data={() => ({
            labels: ["Entrada", "Saída"],
            datasets: [
              {
                label: "# de Fluxo",
                data: flowChartData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          })}
        />
        <Bar
          width={100}
          height={50}
          data={data}
        />
        <HorizontalBar
          width={100}
          height={50}
          data={data}
        />
        <Line
          width={100}
          height={50}
          data={data}
        />
      </div>
    </Container>
  );
};

export default Report;
