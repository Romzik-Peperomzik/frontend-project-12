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
      newChannel(data, callbackHandler) {
        socket.emit('newChannel', data, (response) => {
          callbackHandler(response);
        });
      },
      renameChannel(data, callbackHandler) {
        socket.emit('renameChannel', data, (response) => {
          callbackHandler(response);
        });
      },
      removeChannel(data, callbackHandler) {
        socket.emit('removeChannel', data, (response) => {
          callbackHandler(response);
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
