import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { messagesSelectors } from '../../../slices/messagesSlice';

const MessagesBody = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages
    ? messages.filter(({ channelId }) => channelId === currentChannelId)
    : null;
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: 10000,
      behavior: 'smooth',
    });
  }, [currentChannelMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={scrollRef}>
      {currentChannelMessages
        ? currentChannelMessages.map(({ body, username, id }) => (
          <div className="text-break mb-2" key={id}>
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
