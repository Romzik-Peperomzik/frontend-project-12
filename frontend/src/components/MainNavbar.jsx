import React from 'react';
import {
  Button, Navbar, Container, DropdownButton, ButtonGroup, Dropdown, ToggleButton,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

import useAuth from '../hooks/useAuth';
import routes from '../routes';
import useTheme from '../hooks/useTheme';

const MainNavbar = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const { theme, setDarkTheme, setLightTheme } = useTheme();

  const handleClick = () => {
    auth.logOut();
    navigate({ pathname: routes.loginPagePath() });
  };

  return (
    <Navbar className="shadow-sm" data-bs-theme={theme}>
      <Container>
        <Navbar.Brand>
          <Link
            to={routes.chatPagePath()}
            className="text-decoration-none navbar-link"
            data-bs-theme={theme}
          >
            {t('controls.navLogo')}
          </Link>
        </Navbar.Brand>
        <div>
          <ButtonGroup className="me-2">
            {[{ value: 'light' }, { value: 'dark' }]
              .map((radio, idx) => (
                <ToggleButton
                  key={radio.value}
                  id={`radio-${idx}`}
                  type="radio"
                  data-bs-theme={theme}
                  name="radio"
                  value={radio.value}
                  checked={theme === radio.value}
                  onChange={(e) => {
                    if (e.currentTarget.value === 'light') {
                      setLightTheme();
                    } else {
                      setDarkTheme();
                    }
                  }}
                >
                  {radio.value === 'light' ? <BsFillSunFill /> : <BsFillMoonFill />}
                </ToggleButton>
              ))}
          </ButtonGroup>

          <ButtonGroup vertical className="pe-3" data-bs-theme={theme}>
            <DropdownButton
              as={ButtonGroup}
              title={i18n.language}
              id="bg-vertical-dropdown-1"
              size="sm"
              data-bs-theme={theme}
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
              <Button onClick={handleClick} data-bs-theme={theme}>
                {t('controls.navLogout')}
              </Button>
            )}
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
