import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';

import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import RequireAuth from '../hoc/RequireAuth';

const App = () => (
  <BrowserRouter>
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <Button as={Link} to="/login">Login</Button>
      </Container>
    </Navbar>
    <Routes>
      <Route
        path="/"
        element={(
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        )}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
