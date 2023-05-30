import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import LoginInputField from './LoginInputField';
import routes from '../../../routes';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
        auth.logIn(res);
        setAuthFailed(false);
        navigate({ pathname: routes.chatPagePath() });
      } catch (err) {
        console.log(err);
        setAuthFailed(true);
        if (err?.response?.status === 401) inputRef.current.select();
        else toast.error(t('feedback.noNetwork'));
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [authFailed]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('forms.loginHeader')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <LoginInputField
          name="username"
          placeholder={t('forms.usernickLabel')}
          ref={inputRef}
          type="text"
          formik={formik}
          authFailed={authFailed}
          key="username"
        />

        <LoginInputField
          name="password"
          placeholder={t('forms.passwordLabel')}
          type="password"
          formik={formik}
          authFailed={authFailed}
          authFailedFeedback={t('feedback.invalidLoginAttempt')}
          key="password"
        />

        <Button
          type="submit"
          variant={formik.isSubmitting
            ? 'primary'
            : 'outline-primary'}
          className="w-100 mb-3"
        >
          {t('controls.loginButton')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
