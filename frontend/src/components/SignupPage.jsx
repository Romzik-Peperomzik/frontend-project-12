import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card, Image, Row, Col, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useRollbar } from '@rollbar/react';

import imgSignup from '../assets/signup.jpeg';
import useAuth from '../hooks/useAuth';
import SignupPageFormGroup from './SignupPageFormGroup';
import routes from '../routes';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [isSignupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const rollbar = useRollbar();
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

  const formInputGroupData = [
    { name: 'username', placeholder: t('forms.usernameLabel'), inputRef },
    { name: 'password', placeholder: t('forms.passwordLabel'), type: 'password' },
    {
      name: 'password_confirmation',
      placeholder: t('forms.passwordConfirmation'),
      type: 'password',
    },
  ];

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [isSignupFailed]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        const userData = auth.logIn(res);
        navigate({ pathname: routes.chatPagePath() });
        setSignupFailed(false);
        rollbar.info(`${userData.username} signed up`);
      } catch (err) {
        console.log(err);
        auth.logOut();
        if (err.code === 'ERR_NETWORK') toast.error(t('feedback.noNetwork'));
        if (err.response.status === 409) setSignupFailed(true);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={12} md={8} lg={8} xxl={6}>
          <Card className="shadow-sm">

            <Card.Body
              className=" d-flex flex-column flex-md-row justify-content-around align-items-center p-5"
            >
              <Image src={imgSignup} className="rounded-circle" />

              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('forms.signupHeader')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  {formInputGroupData.map((itemAttributes) => (
                    <SignupPageFormGroup
                      attributes={itemAttributes}
                      formik={formik}
                      isSignupFailed={isSignupFailed}
                      isSignupFailedFeedback={t('feedback.userAlreadyExists')}
                      key={itemAttributes.name}
                    />
                  ))}

                  <Button variant="primary" type="submit" className="w-100">
                    {t('controls.signup')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
