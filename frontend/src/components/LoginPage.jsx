import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Form, Container, Row, Col, Card, Image, FloatingLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import useAuth from '../hooks/useAuth';
import routes from '../routes';
import imgLogin from '../assets/login.jpeg';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const userData = await auth.authorizeUser(routes.loginPath(), values);
        navigate({ pathname: '/' });
        rollbar.info(`${userData.username} logged in`);
      } catch (err) {
        console.log(err);
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (err.code === 'ERR_NETWORK') toast.error(t('feedback.noNetwork'));
        if (err.isAxiosError && err.response.status === 401) inputRef.current.select();
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={12} md={8} lg={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body as={Row} className="p-5">
              <Col sm={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={imgLogin} className="rounded-circle" />
              </Col>
              <Col as={Form} onSubmit={formik.handleSubmit} sm={12} md={6} className="mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('forms.loginHeader')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel htmlFor="username" label={t('forms.usernickLabel')}>
                      <Form.Control
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder="username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={authFailed}
                        required
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4">
                    <FloatingLabel htmlFor="password" label={t('forms.passwordLabel')}>
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{t('feedback.invalidLoginAttempt')}</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('controls.loginButton')}</Button>
                </fieldset>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('forms.loginFooterNoAcc')}</span>
                {' '}
                <a href="/signup">{t('controls.loginFooterRegLink')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
