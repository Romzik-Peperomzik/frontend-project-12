import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/index';
import routes from '../routes';

import { addMessages } from '../slices/messagesSlice'; // addMessage,
import { addChannels, setCurrentChannelId } from '../slices/channelsSlice'; // addChannel,

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
  const [chatData, setChatData] = useState('');

  useEffect(() => {
    async function fetchData() {
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
    <div>
      {!auth.loggedIn && (
        <Navigate to="/login" />
      )}

      {chatData && (
        // <p>{JSON.stringify(chatData)}</p>
        <Container fluid="md">
          <Row>
            <Col sm={2}>{123}</Col>
            <Col lg={10}>{456}</Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ChatPage;
