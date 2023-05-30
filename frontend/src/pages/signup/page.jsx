import React from 'react';
import {
  Card, Image, Row, Col, Container,
} from 'react-bootstrap';

import imgSignUp from '../../assets/signup.jpeg';
import SignupForm from './components/SignupForm';

const SignupPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col sm={12} md={8} lg={8} xxl={6}>
        <Card className="shadow-sm">
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

export default SignupPage;
