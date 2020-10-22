import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../../components/sidebar.js";

import { useHistory } from "react-router-dom";

import "./styles.css";
import { logout } from "../../services/auth";

const Dash = (props) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <>
      <Container fluid id="dashboard-container">
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <h1>Você está logado</h1>
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard;
