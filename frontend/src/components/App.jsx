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

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <MainNavbar />
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

export default App;
