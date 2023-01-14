import axios from 'axios';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});

const Login = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
      const { username, password } = values;
      axios.post('/api/v1/login', { username, password }).then((response) => {
        console.log(response.data); // => { token: ..., username: 'admin' }
      });
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <Field name="username" />
        {touched.username && errors.username && <div>{errors.username}</div>}
        <Field name="password" />
        {touched.password && errors.password && <div>{errors.password}</div>}

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default Login;
