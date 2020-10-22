import React from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../pages/Dashboard/styles.css";

import { useHistory } from "react-router-dom";
import { logout } from "../services/auth";

const Sidebar = (props) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>

        <Nav.Item>
          <Nav.Link>
            <Link to="/dashboard?show">Perfil</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/dashboard?show">Home</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/dashboard?show">Relatórios</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/dashboard?create">Criar</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidebar;
