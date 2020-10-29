import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';

import './styles.css';
import { logout } from '../../services/auth';

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [path] = location.search.split('=');

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey={path}
      >
        <div className="sidebar-sticky" />

        <Nav.Item>
          <Nav.Link eventKey="?profile" as={Link} to="/dashboard?show">
            Perfil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="?show" as={Link} to="/dashboard?show">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="?report" as={Link} to="/dashboard?report">
            Relatórios
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="?create" as={Link} to="/dashboard?create">
            Criar
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
