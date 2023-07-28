import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

import styles from '../Login.module.css';
import useTheme from '../../../hooks/useTheme';

const LoginInputField = forwardRef((props, ref) => {
  const { theme } = useTheme();
  const {
    name, placeholder, type, formik, isAuthFailed, authFailedFeedback,
  } = props;
  const isInvalid = name === 'password'
    ? (formik.touched[name] && formik.errors[name]) || isAuthFailed
    : formik.touched[name] && formik.errors[name];
  const authFailedError = name === 'password'
    ? authFailedFeedback
    : null;
  const classNames = name === 'password'
    ? 'form-floating mb-4'
    : 'form-floating mb-3';

  return (
    <Form.Group className={classNames} key={name}>
      <Form.Control
        id={name}
        name={name}
        placeholder={placeholder}
        ref={ref}
        type={type}
        isInvalid={isInvalid}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={styles[`input-field-${theme}`]}
      />

      <Form.Control.Feedback type="invalid" tooltip>
        {formik.errors[name] ? formik.errors[name] : authFailedError}
      </Form.Control.Feedback>

      <Form.Label htmlFor={name}>
        {placeholder}
      </Form.Label>
    </Form.Group>
  );
});

export default LoginInputField;
