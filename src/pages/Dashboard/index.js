import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './styles.css';
import { logout } from '../../services/auth';

const Dashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <Container fluid id="dashboard-container">
      <h1>Você está logado</h1>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
