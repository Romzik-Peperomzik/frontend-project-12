import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

const SignupInputField = forwardRef((props, ref) => {
  const {
    name, placeholder, type, formik, isSignupFailed, signupFailedFeedback,
  } = props;
  const isInvalid = name === 'password_confirmation'
    ? (formik.touched[name] && formik.errors[name]) || isSignupFailed
    : formik.touched[name] && formik.errors[name];
  const signupFailedError = name === 'password_confirmation'
    ? signupFailedFeedback
    : null;
  const classNames = name === 'password_confirmation'
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
      />

      <Form.Control.Feedback type="invalid" tooltip>
        {formik.errors[name] ? formik.errors[name] : signupFailedError}
      </Form.Control.Feedback>

      <Form.Label htmlFor={name}>
        {placeholder}
      </Form.Label>
    </Form.Group>
  );
});

export default SignupInputField;
