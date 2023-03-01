import React from 'react';
import { Form } from 'react-bootstrap';

const SignupPageFormGroup = ({
  attributes, formik, isSignupFailed, isSignupFailedFeedback,
}) => {
  const {
    name, placeholder, inputRef = null, type,
  } = attributes;

  const isInvalid = (formik.touched[name] && formik.errors[name]) || isSignupFailed;
  const userExistError = name === 'password_confirmation' ? isSignupFailedFeedback : null;
  const classNames = name === 'password_confirmation'
    ? 'form-floating mb-4'
    : 'form-floating mb-3';

  return (
    <Form.Group className={classNames} key={name}>
      <Form.Control
        id={name}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={isInvalid}
        ref={inputRef}
        type={type}
      />
      <Form.Control.Feedback type="invalid" tooltip>
        {formik.errors[name] ? formik.errors[name] : userExistError}
      </Form.Control.Feedback>

      <Form.Label htmlFor={name}>
        {placeholder}
      </Form.Label>
    </Form.Group>
  );
};

export default SignupPageFormGroup;
