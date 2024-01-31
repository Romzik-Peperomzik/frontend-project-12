import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { messagesSelectors } from '../../../slices/messagesSlice';
import useTheme from '../../../hooks/useTheme';

const MessagesBody = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages
    ? messages.filter(({ channelId }) => channelId === currentChannelId)
    : null;
  const scrollRef = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: 10000,
      behavior: 'smooth',
    });
  }, [currentChannelMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={scrollRef} data-bs-theme={theme}>
      {currentChannelMessages
        ? currentChannelMessages.map(({
          body, username, id, date,
        }) => (
          <div className="text-break mb-2" key={id}>
            {date}
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))
        : null}
    </div>
  );
};

export default MessagesBody;
