import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ChannelsPaneHeader from './ChannelsPaneHeader';
import ChannelsPaneNavigation from './ChannelsPaneNavigation';
import MessagesPaneHeader from './MessagesPaneHeader';
import MessagesPaneBody from './MessagesPaneBody';
import MessagesPaneInputForm from './MessagesPaneInputForm';
import getModal from './modals/index';
import routes from '../routes';
import useAuth from '../hooks/useAuth';
import { addChannels, setCurrentChannelId } from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';

const ChatPage = () => {
  const auth = useAuth();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${auth.getToken()}` };
        const res = await axios.get(routes.usersPath(), { headers });
        dispatch(setMessages(res.data.messages));
        dispatch(addChannels(res.data.channels));
        dispatch(setCurrentChannelId(res.data.currentChannelId));
        setIsDataLoaded(true);
      } catch (e) {
        console.error(e);
        auth.logOut();
        setIsDataLoaded(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const modalType = useSelector((state) => state.modal.type);
  const Modal = getModal(modalType);

  return (
    <>
      <Container className="my-4 overflow-hidden rounded shadow" style={{ height: '85%' }}>
        {isDataLoaded && (
          <Row className="bg-white h-100">
            <Col xs={4} md={2} className="pt-5 px-0 border-end bg-light">
              <ChannelsPaneHeader />
              <ChannelsPaneNavigation />
            </Col>
            <Col xs={8} md={10} className="p-0 d-flex flex-column h-100">
              <MessagesPaneHeader />
              <MessagesPaneBody />
              <MessagesPaneInputForm />
            </Col>
          </Row>
        )}
      </Container>
      <Modal />
    </>
  );
};

export default ChatPage;
