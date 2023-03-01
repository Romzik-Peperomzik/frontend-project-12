import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Form, Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import * as yup from 'yup';

import useAuth from '../hooks/useAuth';
import routes from '../routes';
import imgLogin from '../assets/login.jpeg';
import LoginPageFormGroup from './LoginPageFormGroup';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [authFailed]);

  const formGroups = [
    { name: 'username', placeholder: t('forms.usernickLabel'), inputRef },
    { name: 'password', placeholder: t('forms.passwordLabel'), type: 'password' },
  ];

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('feedback.validationRequired')),
      password: yup.string()
        .required(t('feedback.validationRequired')),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        const userData = auth.logIn(res);
        setAuthFailed(false);
        navigate({ pathname: routes.chatPagePath() });
        rollbar.info(`${userData.username} logged in`);
      } catch (err) {
        console.log(err);
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
                  {formGroups.map((itemAttributes) => (
                    <LoginPageFormGroup
                      attributes={itemAttributes}
                      formik={formik}
                      authFailed={authFailed}
                      authFailedFeedback={t('feedback.invalidLoginAttempt')}
                      key={itemAttributes.name}
                    />
                  ))}

                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                    {t('controls.loginButton')}
                  </Button>
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
