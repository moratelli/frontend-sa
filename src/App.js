import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import { isAuthenticated } from './services/auth';

const App = () => {
  useEffect(() => {
    document.title = 'POUP';
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          <Route
            path="/dashboard"
            render={() =>
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <Redirect
                  to={{ pathname: '/', state: { missingAuth: true } }}
                />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
