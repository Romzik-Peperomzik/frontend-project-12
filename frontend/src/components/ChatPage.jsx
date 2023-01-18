import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/index';
import routes from '../routes';

import { addMessages } from '../slices/messagesSlice';
import { addChannels, setCurrentChannelId } from '../slices/channelsSlice';
import ChannelsPane from './ChannelsPane';
import MessagesPane from './MessagesPane';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState(''); // TODO: Не нужно?

  useEffect(() => {
    async function fetchData() {
      if (!auth.loggedIn) return;
      const res = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      const { channels, messages, currentChannelId } = res.data;
      dispatch(addMessages({ messages }));
      dispatch(addChannels({ channels }));
      dispatch(setCurrentChannelId({ currentChannelId }));
      setChatData(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      {!auth.loggedIn && (
        <Navigate to="/login" />
      )}

      {chatData && (
        <Container className="my-4 overflow-hidden rounded shadow">
          <Row className="bg-white vh-100">
            <Col xs={4} md={2} className="pt-5 px-0 border-end bg-light">
              <ChannelsPane />
            </Col>
            <Col xs={8} md={10} className="p-0">
              <MessagesPane>
                <MessagesPane.Header />
                <MessagesPane.Body />
                <MessagesPane.InputForm />
              </MessagesPane>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ChatPage;
