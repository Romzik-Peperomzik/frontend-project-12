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
import SignupPage from './SignupPage';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-reset text-decoration-none">Hexlet Chat</Link>
          </Navbar.Brand>
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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
