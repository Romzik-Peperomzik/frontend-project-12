import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import NotFoundPage from './NotFoundPage';
import RequireAuth from '../hoc/RequireAuth';
import SignupPage from './SignupPage';
import MainNavbar from './MainNavbar';
import routes from '../routes';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <MainNavbar />
      <Routes>
        <Route
          path={routes.chatPagePath()}
          element={(
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          )}
        />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path={routes.signupPagePath()} element={<SignupPage />} />
        <Route path={routes.logoutPagePath()} element={<LogoutPage />} />
        <Route path={routes.notFoundPagePath()} element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
