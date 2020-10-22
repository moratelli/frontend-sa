import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import '../../pages/Dashboard/styles.css';

import { logout } from '../../services/auth';

const Sidebar = () => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky" />

        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard?show">
            Perfil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard?show">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard?show">
            Relatórios
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard?create">
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
