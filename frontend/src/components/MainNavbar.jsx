import React, { useState } from 'react';
import {
  Button, Navbar, Container, DropdownButton, ButtonGroup, Dropdown, ToggleButton,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

import useAuth from '../hooks/useAuth';
import routes from '../routes';
import styles from '../styles.module.css';
import useTheme from '../hooks/useTheme';

const MainNavbar = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const { theme, setDarkTheme, setLightTheme } = useTheme();
  const [radioValue, setRadioValue] = useState(theme);

  const handleClick = () => {
    auth.logOut();
    navigate({ pathname: routes.loginPagePath() });
  };

  return (
    <Navbar className={`shadow-sm ${styles[`navbar-${theme}`]}`}>
      <Container>
        <Navbar.Brand>
          <Link
            to={routes.chatPagePath()}
            className={`text-decoration-none ${styles[`navbar-link-${theme}`]}`}
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
                  variant={radio.value === 'dark' ? 'secondary' : 'light'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => {
                    if (e.currentTarget.value === 'light') {
                      setLightTheme();
                      setRadioValue('light');
                    } else {
                      setDarkTheme();
                      setRadioValue('dark');
                    }
                  }}
                >
                  {radio.value === 'light' ? <BsFillSunFill /> : <BsFillMoonFill />}
                </ToggleButton>
              ))}
          </ButtonGroup>

          <ButtonGroup vertical className="pe-3">
            <DropdownButton
              as={ButtonGroup}
              title={i18n.language}
              id="bg-vertical-dropdown-1"
              size="sm"
              variant={theme === 'light' ? 'light' : 'secondary'}
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
