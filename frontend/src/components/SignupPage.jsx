import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card, Image, Row, Col, Container, FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useRollbar } from '@rollbar/react';

import imgSignup from '../assets/signup.jpeg';
import useAuth from '../hooks/useAuth';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [invalid, setInvalid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const rollbar = useRollbar();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('feedback.validationMin3'))
        .max(20, t('feedback.validationMax20'))
        .required(t('feedback.validationRequired')),
      password: Yup.string()
        .min(6, t('feedback.validationRange6'))
        .required(t('feedback.validationRequired')),
      password_confirmation: Yup.string()
        .required(t('feedback.validationRequired'))
        .oneOf([Yup.ref('password'), null], t('feedback.validationCoincidence')),
    }),
    onSubmit: async (values) => {
      setProcessing(true);
      try {
        const userData = await auth.authorizeUser('/api/v1/signup', values);
        navigate({ pathname: '/' });
        setInvalid(false);
        rollbar.info(`${userData.username} signed up`);
      } catch (err) {
        console.log(err);
        auth.logOut();
        if (err.code === 'ERR_NETWORK') toast.error(t('feedback.noNetwork'));
        if (err.response.status === 409) setInvalid(true);
      }
      setProcessing(false);
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={12} md={8} lg={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={imgSignup} className="rounded-circle" />
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('forms.signupHeader')}</h1>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="username" label={t('forms.usernameLabel')}>
                    <Form.Control
                      name="username"
                      placeholder={t('forms.usernameLabel')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    {formik.touched.username
                    && formik.errors.username ? (
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                      ) : null}
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="password" label={t('forms.passwordLabel')}>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('forms.passwordLabel')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && formik.errors.password}
                    />
                    {formik.touched.password
                    && formik.errors.password ? (
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                      ) : null}
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingInput" label={t('forms.passwordConfirmation')}>
                    <Form.Control
                      name="password_confirmation"
                      type="password"
                      placeholder={t('forms.passwordConfirmation')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password_confirmation}
                      isInvalid={formik.touched.password_confirmation
                        && formik.errors.password_confirmation}
                    />
                    {formik.touched.password_confirmation
                    && formik.errors.password_confirmation ? (
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password_confirmation}</Form.Control.Feedback>
                      ) : null}
                  </FloatingLabel>
                </Form.Group>

                {invalid && <div className="text-danger mb-3">{t('feedback.userAlreadyExists')}</div>}

                <Button variant="primary" type="submit" className="w-100" disabled={processing}>{t('controls.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
