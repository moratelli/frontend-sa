import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Bar, Pie, HorizontalBar, Line } from 'react-chartjs-2';
import api from '../../services/api';
import { getUserData } from '../../services/auth';

import './styles.css';

const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [flowChartData, setFlowChartData] = useState([]);
  const [inCategoryChartData, setInCategoryChartData] = useState([]);
  const [outCategoryChartData, setOutCategoryChartData] = useState([]);
  const [datetimeInChartData, setDatetimeInChartData] = useState([]);
  const [datetimeOutChartData, setDatetimeOutChartData] = useState([]);
  const { userId } = getUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/transactions`);

        setTransactions(response.data.transactions || []);
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
    const totalOut = outTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );

    setFlowChartData([totalIn, totalOut]);
  }, [transactions]);

  useEffect(() => {
    console.log('trans', transactions);
    //  const sumIn = {};
    //  const sumOut = {};
    const sumInArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const sumOutArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    transactions.forEach((transaction) => {
      const month = new Date(transaction.createdAt).getMonth();

      if (transaction.flow === 'IN') {
        const monthValue = sumInArray[month] || 0;
        sumInArray[month] = monthValue + transaction.value;
      }

      if (transaction.flow === 'OUT') {
        const monthValue = sumOutArray[month] || 0;
        sumOutArray[month] = monthValue + transaction.value;
      }
    });

    setDatetimeInChartData(sumInArray);
    setDatetimeOutChartData(sumOutArray);
  }, [transactions]);

  useEffect(() => {
    const salarioTransactions = transactions.filter(
      (t) => t.category === 'SALARIO'
    );
    const totalSalario = salarioTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const investimentosTransactions = transactions.filter(
      (t) => t.category === 'INVESTIMENTO'
    );
    const totalInvestimentos = investimentosTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const emprestimoTransactions = transactions.filter(
      (t) => t.category === 'EMPRESTIMO'
    );
    const totalEmprestimo = emprestimoTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const outrosTransactions = transactions.filter(
      (t) => t.category === 'OUTROS' && t.flow === 'IN'
    );
    const totalOutros = outrosTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );

    setInCategoryChartData([
      totalSalario,
      totalInvestimentos,
      totalEmprestimo,
      totalOutros,
    ]);
  }, [transactions]);

  useEffect(() => {
    const alimentacaoTransactions = transactions.filter(
      (t) => t.category === 'ALIMENTACAO'
    );
    const totalAlimentacao = alimentacaoTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const assinaturasTransactions = transactions.filter(
      (t) => t.category === 'ASSINATURAS_E_SERVICOS'
    );
    const totalAssinaturas = assinaturasTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const educacaoTransactions = transactions.filter(
      (t) => t.category === 'EDUCACAO'
    );
    const totalEducacao = educacaoTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const impostosTransactions = transactions.filter(
      (t) => t.category === 'IMPOSTOS_E_ETAXAS'
    );
    const totalImpostos = impostosTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const lazerTransactions = transactions.filter(
      (t) => t.category === 'LAZER_E_HOBBIES'
    );
    const totalLazer = lazerTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const moradiaTransactions = transactions.filter(
      (t) => t.category === 'MORADIA'
    );
    const totalMoradia = moradiaTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const petsTransactions = transactions.filter((t) => t.category === 'PETS');
    const totalPets = petsTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const roupasTransactions = transactions.filter(
      (t) => t.category === 'ROUPAS'
    );
    const totalRoupas = roupasTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const saudeTransactions = transactions.filter(
      (t) => t.category === 'SAUDE'
    );
    const totalSaude = saudeTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const transporteTransactions = transactions.filter(
      (t) => t.category === 'TRANSPORTE'
    );
    const totalTransporte = transporteTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );
    const outrosTransactions = transactions.filter(
      (t) => t.category === 'OUTROS' && t.flow === 'OUT'
    );
    const totalOutros = outrosTransactions.reduce(
      (total, cur) => total + cur.value,
      0
    );

    setOutCategoryChartData([
      totalAlimentacao,
      totalAssinaturas,
      totalEducacao,
      totalImpostos,
      totalLazer,
      totalMoradia,
      totalPets,
      totalRoupas,
      totalSaude,
      totalTransporte,
      totalOutros,
    ]);
  }, [transactions]);

  return (
    <Container fluid id="report-container">
      <Col xs={10} style={{ margin: 'auto' }}>
        <h1>Relatórios</h1>
        <br />
        <Row>
          <div
            className="col-4"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
                  scales: {
                    yAxes: [
                      {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                      },
                      {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-2',
                        gridLines: {
                          drawOnArea: false,
                        },
                      },
                    ],
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
                    yAxisID: ['y-axis-1', 'y-axis-2'],
                  },
                ],
              })}
            />
          </div>
          <div className="col-8">
            <Line
              options={{
                tooltips: {
                  enabled: true,
                  mode: 'single',
                  callbacks: {
                    label(tooltipItems, data) {
                      return `R$ ${
                        data.datasets[tooltipItems.datasetIndex].data[
                          tooltipItems.index
                        ]
                      }`;
                    },
                  },
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
              data={() => ({
                labels: [
                  'Janeiro',
                  'Fevereiro',
                  'Marco',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ],
                datasets: [
                  {
                    label: '# of Votes',
                    data: datetimeInChartData,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132)',
                  },
                  {
                    label: '# of Vote',
                    data: datetimeOutChartData,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                  },
                ],
              })}
            />
          </div>
        </Row>
        <Row>
          <div className="col-6">
            <Bar
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
                labels: ['Salário', 'Investimentos', 'Empréstimo', 'Outros'],
                datasets: [
                  {
                    label: '# de Categoria de Entradas',
                    data: inCategoryChartData,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              })}
            />
          </div>

          <div className="col-6">
            <HorizontalBar
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
                labels: [
                  'Alimentação',
                  'Assinaturas',
                  'Educação',
                  'Impostos',
                  'Lazer',
                  'Moradia',
                  'Pets',
                  'Roupas',
                  'Saude',
                  'Transporte',
                  'Outros',
                ],
                datasets: [
                  {
                    label: '# de Categoria de Saídas',
                    data: outCategoryChartData,
                    // data: [1,2,3,4,5,6,7,8,9,10],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              })}
            />
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default Report;
