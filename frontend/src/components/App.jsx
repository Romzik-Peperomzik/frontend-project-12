import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ChatPage from './ChatPage';
import LoginPage from '../pages/login/page';
import NotFoundPage from '../pages/404/page';
import SignupPage from '../pages/signup/page';
import MainNavbar from './MainNavbar';
import RequireAuth from './RequireAuth';
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
        <Route path={routes.notFoundPagePath()} element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
