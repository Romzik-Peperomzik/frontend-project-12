import React from 'react';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import imgLogin from '../../assets/login.jpeg';
import LoginForm from './components/LoginForm';
import styles from './Login.module.css';
import useTheme from '../../hooks/useTheme';

const Login = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={12} md={8} lg={8} xxl={6}>
          <Card className={`shadow-sm ${styles[`card-${theme}`]}`}>
            <Card.Body as={Row} className="p-5">
              <Col
                sm={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image src={imgLogin} className="rounded-circle" />
              </Col>
              <Col sm={12} md={6} className="mt-3">
                <LoginForm />
              </Col>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('forms.loginFooterNoAcc')}</span>
                {' '}
                <Link to={routes.signupPagePath()}>
                  {t('controls.loginFooterRegLink')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
