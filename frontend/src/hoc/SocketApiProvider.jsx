import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import SocketApiContext from '../contexts/socketApiContext';
import store from '../slices/index';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

const SocketApiProvider = ({ children, socket }) => {
  const { t } = useTranslation();

  const socketApiHandler = () => {
    socket.on('newMessage', (message) => {
      store.dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      store.dispatch(addChannel(channel));
      toast.success(t('feedback.channelAdded'));
    });

    socket.on('renameChannel', ({ id, name }) => {
      store.dispatch(renameChannel({ id, changes: { name } }));
      toast.success(t('feedback.channelRenamed'));
    });

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(removeChannel(id));
      toast.success(t('feedback.channelRemoved'));
    });

    const socketApi = {
      newMessage(data) {
        socket.emit('newMessage', data, (response) => {
          if (response.status === 'ok') return;
          throw new Error(response.err);
        });
      },
      newChannel(data) {
        socket.emit('newChannel', data, (response) => {
          if (response.status === 'ok') return; // store.dispatch(setCurrentChannelId(response.data.id))
          throw new Error(response.err);
        });
      },
      renameChannel(data) {
        socket.emit('renameChannel', data, (response) => {
          if (response.status === 'ok') return;
          throw new Error(response.err);
        });
      },
      removeChannel(data) {
        socket.emit('removeChannel', data, (response) => {
          if (response.status === 'ok') return;
          throw new Error(response.err);
        });
      },
    };
    return socketApi;
  };
  const socketApi = socketApiHandler();

  return (
    <SocketApiContext.Provider value={socketApi}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketApiProvider;
