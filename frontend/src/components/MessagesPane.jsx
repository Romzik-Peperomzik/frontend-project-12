import React, { useState } from 'react';
import {
  Button,
  Image,
  InputGroup,
  Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import useSocketApi from '../hooks/useSocketApi';
import useAuth from '../hooks/useAuth';
import { channelsSelectors } from '../slices/channelsSlice';
import { messagesSelectors } from '../slices/messagesSlice';
import svgArrow from '../assets/arrow.svg';

const Header = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelName = useSelector((state) => {
    const { currentChannelId } = state.channels;
    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    return `# ${currentChannel.name}`;
  });

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{channelName}</b></p>
      <span className="text-muted">0 сообщений</span>
    </div>
  );
};

const Body = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map(({ body, username, id }) => ( // channelId,
        <div className="text-break mb-2" key={id}>
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const auth = useAuth();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const socketApi = useSocketApi();

  const handleSubmitInputForm = (e) => {
    e.preventDefault();
    socketApi.sendMessage({
      username: auth.getUsername(),
      body: inputValue,
      channelId: currentChannelId,
    });
    setInputValue('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmitInputForm} noValidate className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <Form.Control
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            aria-describedby="basic-addon2"
            className="border-0 p-0 ps-2"
            value={inputValue}
            onChange={handleChange}
          />
          <Button variant="white" type="submit" className="btn-group-vertical border-0" disabled={!inputValue}>
            <Image src={svgArrow} alt="arrow" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

const MessagesPane = ({ children }) => (
  <div className="d-flex flex-column h-100">
    {children}
  </div>
);

MessagesPane.Header = Header;
MessagesPane.Body = Body;
MessagesPane.InputForm = InputForm;

export default MessagesPane;
