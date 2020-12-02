import React from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.css";
import Sidebar from "../../components/Sidebar/index";
import Profile from "../Profile";
import Show from "../Show";
import Create from "../Create";
import Report from "../Report";

const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const [path] = location.search.split("=");

  let content;

  switch (path) {
    case "?profile":
      content = <Profile />;
      break;
    case "?show":
      content = <Show />;
      break;
    case "?create":
    case "?edit":
      content = <Create />;
      break;
    case "?report":
      content = <Report />;
      break;
    default:
      history.push({ pathname: "/dashboard", search: "?show" });
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
