import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Bar, Pie, HorizontalBar } from 'react-chartjs-2'

import './styles.css';
import api from '../../services/api';
import { getUserData } from '../../services/auth';

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
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Report = () => {
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
        setErrorMessage('Ocorreu um erro ao exibir seu relatório!');
      }
    }
  };

  return (
    <Container fluid id="create-container">
      <div><Bar data={data} options={options}/></div>
      <div><Pie data={data} /></div>
      <div><HorizontalBar data={data} /></div>
    </Container>
  );
};

export default Report;
