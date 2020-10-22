import React from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';
import Sidebar from '../../components/Sidebar/index';
import Create from '../Create';
import Show from '../Show';

const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const [path] = location.search.split('=');

  let content;

  switch (path) {
    case '?show':
      content = <Show />;
      break;
    case '?create':
      content = <Create />;
      break;
    default:
      history.push({ pathname: '/dashboard', search: '?show' });
  }

  return (
    <Container fluid id="dashboard-container">
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          {content}
        </Col>
      </Row>

    </Container>
  );
};

export default Dashboard;
