import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { channelsSelectors } from '../../../slices/channelsSlice';
import { messagesSelectors } from '../../../slices/messagesSlice';
import useTheme from '../../../hooks/useTheme';

const MessageHeader = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages
    ? messages.filter(({ channelId }) => channelId === currentChannelId)
    : null;

  const channels = useSelector(channelsSelectors.selectAll);
  const channelName = useSelector(() => {
    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    return currentChannel
      ? `# ${currentChannel.name}`
      : null;
  });

  const { theme } = useTheme();

  return (
    <div className="mb-4 p-3 small chat-messages-header" data-bs-theme={theme}>
      <p className="m-0"><b>{channelName}</b></p>
      {currentChannelMessages && (
        <span className="text-muted">
          {t('panes.messagesHeader', { count: currentChannelMessages.length })}
        </span>
      )}
    </div>
  );
};

export default MessageHeader;
