import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';

const MainNavbar = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-reset text-decoration-none">{t('controls.navLogo')}</Link>
        </Navbar.Brand>
        {auth.user && (<Button as={Link} to="/logout">{t('controls.navLogout')}</Button>)}
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
