import React from 'react';
import { useSelector } from 'react-redux';

import { messagesSelectors } from '../slices/messagesSlice';

const MessagesPaneBody = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentChannelMessages.map(({ body, username, id }) => (
        <div className="text-break mb-2" key={id}>
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default MessagesPaneBody;
