import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Bar, Pie, HorizontalBar } from 'react-chartjs-2';
import api from '../../services/api';
import { getUserData } from '../../services/auth';

import './styles.css';

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
  const { userId } = getUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/transactions`);

        setTransactions(response.data || []);
      } catch (err) {
        console.log('ERROR GET TRANSACTIONS');
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const inTransactions = transactions.filter((t) => t.flow === 'IN');
    const totalIn = inTransactions.reduce((total, cur) => total + cur.value, 0);

    const outTransactions = transactions.filter((t) => t.flow === 'OUT');
    const totalOut = outTransactions.reduce((total, cur) => total + cur.value, 0);

    setFlowChartData([totalIn, totalOut]);
  }, [transactions]);

  return (
    <Container fluid id="report-container">
      <h1>Relatórios</h1>
      <br />
      <div>
        <Pie
          options={{
            tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                label(tooltipItems, data) {
                  return `R$ ${data.datasets[0].data[tooltipItems.index]}`;
                },
              },
            },
          }}
          data={() => ({
            labels: ['Entrada', 'Saída'],
            datasets: [
              {
                label: '# de Fluxo',
                data: flowChartData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              },
            ],
          })}
        />
      </div>
    </Container>
  );
};

export default Report;
