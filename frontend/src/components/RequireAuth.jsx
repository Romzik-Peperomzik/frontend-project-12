import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import routes from '../routes';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (auth.userData) return children;
  return <Navigate to={routes.loginPagePath()} state={{ from: location }} />;
};

export default RequireAuth;
