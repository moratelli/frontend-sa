import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Bar, Pie, HorizontalBar } from "react-chartjs-2";
import api from "../../services/api";
import { getUserData } from "../../services/auth";

import "./styles.css";

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [flowChartData, setFlowChartData] = useState([]);
  const [inCategoryChartData, setInCategoryChartData] = useState([]);
  const [outCategoryChartData, setOutCategoryChartData] = useState([]);
  const { userId } = getUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/transactions`);

        setTransactions(response.data.transactions || []);
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
      0,
    );

    setFlowChartData([totalIn, totalOut]);
  }, [transactions]);

  useEffect(() => {
    const salarioTransactions = transactions.filter(
      (t) => t.category === "SALARIO",
    );
    const totalSalario = salarioTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const investimentosTransactions = transactions.filter(
      (t) => t.category === "INVESTIMENTO",
    );
    const totalInvestimentos = investimentosTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const emprestimoTransactions = transactions.filter(
      (t) => t.category === "EMPRESTIMO",
    );
    const totalEmprestimo = emprestimoTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const outrosTransactions = transactions.filter(
      (t) => t.category === "OUTROS" && t.flow === "IN",
    );
    const totalOutros = outrosTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
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
      (t) => t.category === "ALIMENTACAO",
    );
    const totalAlimentacao = alimentacaoTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const assinaturasTransactions = transactions.filter(
      (t) => t.category === "ASSINATURAS_E_SERVICOS",
    );
    const totalAssinaturas = assinaturasTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const educacaoTransactions = transactions.filter(
      (t) => t.category === "EDUCACAO",
    );
    const totalEducacao = educacaoTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const impostosTransactions = transactions.filter(
      (t) => t.category === "IMPOSTOS_E_ETAXAS",
    );
    const totalImpostos = impostosTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const lazerTransactions = transactions.filter(
      (t) => t.category === "LAZER_E_HOBBIES",
    );
    const totalLazer = lazerTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const petsTransactions = transactions.filter((t) => t.category === "PETS");
    const totalPets = petsTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const roupasTransactions = transactions.filter(
      (t) => t.category === "ROUPAS",
    );
    const totalRoupas = roupasTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const saudeTransactions = transactions.filter(
      (t) => t.category === "SAUDE",
    );
    const totalSaude = saudeTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const transporteTransactions = transactions.filter(
      (t) => t.category === "TRANSPORTE",
    );
    const totalTransporte = transporteTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );
    const outrosTransactions = transactions.filter(
      (t) => t.category === "OUTROS" && t.flow === "OUT",
    );
    const totalOutros = outrosTransactions.reduce(
      (total, cur) => total + cur.value,
      0,
    );

    setOutCategoryChartData([
      totalAlimentacao,
      totalAssinaturas,
      totalEducacao,
      totalImpostos,
      totalLazer,
      totalPets,
      totalRoupas,
      totalSaude,
      totalTransporte,
      totalOutros,
    ]);
  }, [transactions]);

  return (
    <Container fluid id="report-container">
      <div id="page-content-wrapper" class="col-10">
        <h1>Relatórios</h1>
        <br />
        <div class="col-8">
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
        </div>
        <Row>
        <div class="col-6">
          <Bar
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
              labels: ["Salário", "Investimentos", "Empréstimo", "Outros"],
              datasets: [
                {
                  label: "# de Categoria de Entradas",
                  data: inCategoryChartData,
                  // data: [30,50,20,100],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            })}
          />
        </div>

        <div class="col-6">
          <HorizontalBar
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
              labels: [
                "Alimentação",
                "Assinaturas",
                "Educação",
                "Impostos",
                "Lazer",
                "Pets",
                "Roupas",
                "Saude",
                "Transporte",
                "Outros",
              ],
              datasets: [
                {
                  label: "# de Categoria de Saídas",
                  data: outCategoryChartData,
                  // data: [1,2,3,4,5,6,7,8,9,10],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            })}
          />

          {/* <Line width={100} height={50} data={data} /> */}
          </div>
          </Row>

      </div>
    </Container>
  );
};

export default Report;
