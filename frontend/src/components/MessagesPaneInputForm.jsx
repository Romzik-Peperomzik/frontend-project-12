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
import svgArrow from '../assets/arrow.svg';

const MessagesPaneInputForm = () => {
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

export default MessagesPaneInputForm;
