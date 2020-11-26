import React from "react";
import { Nav, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faChartLine,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../img/poup-logo-light.png";

import "./styles.css";
import { logout } from "../../services/auth";

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [path] = location.search.split("=");

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <>
      <Nav className="col-md-12 sidebar" activeKey={path} variant="pills">
        <header className="mb-5">
          <img src={logo} alt="Logo" />
        </header>

        <Nav.Item>
          <Nav.Link eventKey="?show" as={Link} to="/dashboard?show">
            <FontAwesomeIcon icon={faHome} />
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="?report" as={Link} to="/dashboard?report">
            <FontAwesomeIcon icon={faChartLine} />
            Relatórios
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="?create" as={Link} to="/dashboard?create">
            <FontAwesomeIcon icon={faPlus} />
            Criar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="?profile" as={Link} to="/dashboard?profile">
            <FontAwesomeIcon icon={faUser} />
            Perfil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Button size="sm" variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidebar;
