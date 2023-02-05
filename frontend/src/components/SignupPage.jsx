import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card, Image, Row, Col, Container, FloatingLabel,
} from 'react-bootstrap';
import * as Yup from 'yup';

import imgSignup from '../assets/signup.jpeg';
import useAuth from '../hooks/useAuth';

const SignupPage = () => {
  const auth = useAuth();
  const [invalid, setInvalid] = useState(false);
  // const history = useHistory();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      password_confirmation: Yup.string()
        .required('Обязательное поле')
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    }),
    onSubmit: async (values) => {
      setProcessing(true);
      try {
        await auth.authorizeUser('/api/v1/signup', values);
        navigate({ pathname: '/' });
        setInvalid(false);
      } catch (err) {
        console.error(err);
        if (err.response.status === 409) {
          auth.logOut();
          setInvalid(true);
        } else {
          throw new Error('Network error');
        }
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
                <h1 className="text-center mb-4">Регистрация</h1>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="username" label="Имя пользователя">
                    <Form.Control
                      name="username"
                      placeholder="Имя пользователя"
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
                  <FloatingLabel controlId="password" label="Пароль">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Пароль"
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
                  <FloatingLabel controlId="floatingInput" label="Подтвердите пароль">
                    <Form.Control
                      name="password_confirmation"
                      type="password"
                      placeholder="Подтвердите пароль"
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

                {invalid && <div className="text-danger mb-3">Такой пользователь уже существует</div>}

                <Button variant="primary" type="submit" className="w-100" disabled={processing}>Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
