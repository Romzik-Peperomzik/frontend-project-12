import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import NotFoundPage from './NotFoundPage';
import RequireAuth from '../hoc/RequireAuth';
import SignupPage from './SignupPage';
import useAuth from '../hooks/useAuth';

const App = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { loggedIn } = auth;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand>
              <Link to="/" className="text-reset text-decoration-none">{t('controls.navLogo')}</Link>
            </Navbar.Brand>
            {loggedIn && (<Button as={Link} to="/logout">{t('controls.navLogout')}</Button>)}
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
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
