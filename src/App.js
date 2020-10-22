import React from 'react';
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
import Create from './pages/Create';
import { isAuthenticated } from './services/auth';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route
          path="/dashboard"
          render={(props) => (
            isAuthenticated()
              ? <Dashboard />
              : <Redirect to={{ pathname: '/', state: { missingAuth: true } }} />
          )}
        />
      </Switch>
    </div>
  </Router>
);

export default App;
