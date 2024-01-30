import React from 'react';
import {
  Card, Image, Row, Col, Container,
} from 'react-bootstrap';

import imgSignUp from '../../assets/signup.jpeg';
import SignupForm from './SignupForm';
import useTheme from '../../hooks/useTheme';

const Signup = () => {
  const { theme } = useTheme();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={12} md={8} lg={8} xxl={6}>
          <Card className="shadow-sm" data-bs-theme={theme}>
            <Card.Body
              className="d-flex flex-column flex-md-row justify-content-around /
                align-items-center p-5"
            >
              <Image src={imgSignUp} className="rounded-circle" />
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
