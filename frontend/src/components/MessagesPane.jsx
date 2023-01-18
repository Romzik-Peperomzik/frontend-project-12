import React, { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => { // { children } TODO: Нужно?
  const channelName = useSelector((state) => {
    const { currentChannelId } = state.channelsReducer;
    const currentChannel = state.channelsReducer.channels.find(({ id }) => id === currentChannelId);
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
  const messages = useSelector((state) => state.messagesReducer.messages);
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
  const handleSubmitInputForm = (e) => {
    e.preventDefault();
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
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
