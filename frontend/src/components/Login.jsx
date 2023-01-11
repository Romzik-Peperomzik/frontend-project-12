import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  nickname: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});

const Login = () => (
  <Formik
    initialValues={{ nickname: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <Field name="nickname" />
        {touched.nickname && errors.nickname && <div>{errors.nickname}</div>}
        <Field name="password" />
        {touched.password && errors.password && <div>{errors.password}</div>}

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default Login;
