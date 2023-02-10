import React from 'react';

import SocketApiContext from '../contexts/socketApiContext';
import store from '../slices/index';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

const SocketApiProvider = ({ children, socket }) => {
  const socketApiHandler = () => {
    socket.on('newMessage', (message) => {
      store.dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      store.dispatch(addChannel(channel));
    });

    socket.on('renameChannel', ({ id, name }) => {
      store.dispatch(renameChannel({ id, changes: { name } }));
    });

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(removeChannel(id));
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
