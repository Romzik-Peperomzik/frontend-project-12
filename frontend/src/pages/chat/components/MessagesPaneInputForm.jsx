import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Image,
  InputGroup,
  Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import useSocketApi from '../../../hooks/useSocketApi';
import useAuth from '../../../hooks/useAuth';
import svgArrow from '../../../assets/arrow.svg';

const MessagesPaneInputForm = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isDisable, setDisable] = useState(false);
  const auth = useAuth();
  const inputRef = useRef();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const socketApi = useSocketApi();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmitInputForm = (e) => {
    e.preventDefault();
    setDisable(!isDisable);
    socketApi.newMessage({
      username: auth.userData.username,
      body: filter.clean(inputValue),
      channelId: currentChannelId,
    })
      .then(() => {
        setInputValue('');
        setDisable(!!isDisable);
      })
      .catch((err) => {
        console.error(err);
        toast.error(t('feedback.noNetwork'));
        setDisable(!!isDisable);
      });
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmitInputForm} noValidate className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            placeholder={t('forms.messagesInputPlaceholder')}
            value={inputValue}
            onChange={handleChange}
            ref={inputRef}
            aria-label={t('forms.messagesInput')}
            aria-describedby="basic-addon2"
            className="border-0 p-0 ps-2"
            disabled={isDisable}
          />
          <Button
            variant="white"
            type="submit"
            className="btn-group-vertical border-0"
            disabled={!inputValue || isDisable}
          >
            <Image src={svgArrow} alt="arrow" />
            <span className="visually-hidden">{t('controls.messagesSendInput')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesPaneInputForm;
