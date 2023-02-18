import React from 'react';
import { Form } from 'react-bootstrap';

const LoginPageFormGroup = ({
  attributes, formik, authFailed, authFailedFeedback,
}) => {
  const {
    name, placeholder, inputRef = null, type,
  } = attributes;

  const classNames = name === 'password'
    ? 'form-floating mb-4'
    : 'form-floating mb-3';

  const isInvalid = authFailed
    ? (
      <Form.Control.Feedback type="invalid" tooltip>
        {authFailedFeedback}
      </Form.Control.Feedback>
    ) : null;

  return (
    <Form.Group className={classNames} key={name}>
      <Form.Control
        id={name}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={authFailed}
        ref={inputRef}
        required
        type={type}
      />
      {name === 'password'
        ? isInvalid
        : null}
      <Form.Label htmlFor="username">
        {placeholder}
      </Form.Label>
    </Form.Group>
  );
};

export default LoginPageFormGroup;
