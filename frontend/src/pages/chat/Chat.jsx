import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ChannelHeader from './ChannelsPane/ChannelHeader';
import ChannelNavigation from './ChannelsPane/ChannelNavigation';
import MessageHeader from './MessagePane/MessageHeader';
import MessageBody from './MessagePane/MessageBody';
import MessageInputForm from './MessagePane/MessageInputForm';
import getModal from '../../components/modals';
import useAuth from '../../hooks/useAuth';
import fetchData from '../../slices/fetchThunk';
import routes from '../../routes';

const Chat = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const authHeader = auth.getAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData(authHeader))
      .unwrap()
      .catch((err) => {
        console.error(err);
        if (err.statusCode === 401) {
          toast.error(t('feedback.unAuth'));
          auth.logOut();
          navigate({ pathname: routes.loginPagePath() });
        } else toast.error(t('feedback.noNetwork'));
      });
  }, [dispatch]);

  const modalType = useSelector((state) => state.modal.type);
  const Modal = getModal(modalType);

  return (
    <Container className="my-4 overflow-hidden rounded shadow h-100">
      <Row className="bg-white h-100">
        <Col xs={4} md={2} className="pt-5 px-0 border-end bg-light">
          <ChannelHeader />
          <ChannelNavigation />
        </Col>
        <Col xs={8} md={10} className="p-0 d-flex flex-column h-100">
          <MessageHeader />
          <MessageBody />
          <MessageInputForm />
        </Col>
      </Row>
      <Modal />
    </Container>
  );
};

export default Chat;
