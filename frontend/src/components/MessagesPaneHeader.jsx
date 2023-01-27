import React from 'react';
import { useSelector } from 'react-redux';

import { channelsSelectors } from '../slices/channelsSlice';
import { messagesSelectors } from '../slices/messagesSlice';

const MessagesPaneHeader = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  const channels = useSelector(channelsSelectors.selectAll);
  const channelName = useSelector(() => {
    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    return `# ${currentChannel.name}`;
  });

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{channelName}</b></p>
      <span className="text-muted">{`${currentChannelMessages.length} сообщений`}</span>
    </div>
  );
};

export default MessagesPaneHeader;
