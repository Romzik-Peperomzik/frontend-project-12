import React from 'react';
import {
  Button, Navbar, Container, DropdownButton, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';
import routes from '../routes';

const MainNavbar = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    auth.logOut();
    navigate({ pathname: routes.loginPagePath() });
  };

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link
            to={routes.chatPagePath()}
            className="text-reset text-decoration-none"
          >
            {t('controls.navLogo')}
          </Link>
        </Navbar.Brand>
        <div>
          <ButtonGroup vertical className="pe-3">
            <DropdownButton
              as={ButtonGroup}
              title={i18n.language}
              id="bg-vertical-dropdown-1"
              size="sm"
              variant="light"
            >
              <Dropdown.Item eventKey="1" onClick={() => i18n.changeLanguage('ru')}>
                ru
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => i18n.changeLanguage('en')}>
                en
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          {auth.userData
            && (
            <Button onClick={handleClick}>
              {t('controls.navLogout')}
            </Button>
            )}
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
