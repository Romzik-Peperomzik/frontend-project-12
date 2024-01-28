import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import SignupInputField from './SignupInputField';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth';

const SignupForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [isSignupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup.string()
      .min(3, t('feedback.validationMin3Max20'))
      .max(20, t('feedback.validationMin3Max20'))
      .required(t('feedback.validationRequired')),
    password: yup.string()
      .min(6, t('feedback.validationFrom6Char'))
      .required(t('feedback.validationRequired')),
    password_confirmation: yup.string()
      .required(t('feedback.validationRequired'))
      .oneOf([yup.ref('password'), null], t('feedback.validationCoincidence')),
  });

  const submitAction = async (values) => {
    setSignupFailed(false);
    try {
      const res = await axios.post(routes.signupPath(), values);
      auth.logIn(res);
      navigate({ pathname: routes.chatPagePath() });
    } catch (err) {
      console.log(err);
      auth.logOut();
      if (err?.response?.status === 409) setSignupFailed(true);
      else toast.error(t('feedback.noNetwork'));
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema,
    onSubmit: submitAction,
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [isSignupFailed]);

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('forms.signupHeader')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <SignupInputField
          name="username"
          placeholder={t('forms.usernameLabel')}
          ref={inputRef}
          type="text"
          formik={formik}
          isSignupFailed={isSignupFailed}
        />

        <SignupInputField
          name="password"
          placeholder={t('forms.passwordLabel')}
          type="password"
          formik={formik}
          isSignupFailed={isSignupFailed}
        />

        <SignupInputField
          name="password_confirmation"
          placeholder={t('forms.passwordConfirmation')}
          type="password"
          formik={formik}
          isSignupFailed={isSignupFailed}
          signupFailedFeedback={t('feedback.userAlreadyExists')}
        />

        <Button
          type="submit"
          variant={formik.isSubmitting
            ? 'primary'
            : 'outline-primary'}
          className="w-100 mb-3"
        >
          {t('controls.signup')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default SignupForm;
