import React from 'react';
import { Form } from 'react-bootstrap';

const SignupPageFormGroup = ({ attributes, formik }) => {
  const {
    name, placeholder, inputRef = null, type,
  } = attributes;

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
        isInvalid={formik.touched[name] && formik.errors[name]}
        onBlur={formik.handleBlur}
        ref={inputRef}
        type={type}
      />
      {formik.touched[name] && formik.errors[name]
        ? (
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors[name]}
          </Form.Control.Feedback>
        )
        : null}
      <Form.Label htmlFor="username">
        {placeholder}
      </Form.Label>
    </Form.Group>
  );
};

export default SignupPageFormGroup;
