/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts/index';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Hexlet</Navbar.Brand>
        <Button as={Link} to="/homepage">Homepage</Button>
        <Button as={Link} to="/login" style={{ marginLeft: '10px' }}>Login</Button>
      </Navbar>

      <div className="contaier">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
