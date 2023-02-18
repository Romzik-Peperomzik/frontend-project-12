import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import routes from '../routes';

const LogoutPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.logOut();
    navigate({ pathname: routes.loginPagePath() });
  }, [navigate]);
};

export default LogoutPage;
