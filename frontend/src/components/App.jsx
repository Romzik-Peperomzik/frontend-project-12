import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Chat from '../pages/chat/Chat';
import Login from '../pages/login/Login';
import NotFound from '../pages/404/NotFound';
import Signup from '../pages/signup/Signup';
import MainNavbar from './MainNavbar';
import RequireAuth from './RequireAuth';
import routes from '../routes';
import useTheme from '../hooks/useTheme';

const App = () => {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100 main-container" data-bs-theme={theme}>
        <MainNavbar />
        <Routes>
          <Route
            path={routes.chatPagePath()}
            element={(
              <RequireAuth>
                <Chat />
              </RequireAuth>
            )}
          />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.signupPagePath()} element={<Signup />} />
          <Route path={routes.notFoundPagePath()} element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
