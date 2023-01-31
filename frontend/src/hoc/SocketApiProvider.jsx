import React from 'react';
import { useSelector } from 'react-redux';

import SocketApiContext from '../contexts/socketApiContext';
import store from '../slices/index';
import { addChannel, setCurrentChannelId } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

const SocketApiProvider = ({ children, socket }) => {
  const recentlyCreatedChannel = useSelector((state) => state.channels.recentlyCreatedChannel);

  const socketApiHandler = () => {
    socket.on('newMessage', (message) => {
      store.dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      store.dispatch(addChannel(channel));
      if (channel.name === recentlyCreatedChannel) store.dispatch(setCurrentChannelId(channel.id));
    });

    const socketApi = {
      newMessage(data) {
        socket.emit('newMessage', data, (response) => {
          if (response.status === 'ok') return (response.data);
          throw new Error(response.err);
        });
      },
      newChannel(data) {
        socket.emit('newChannel', data, (response) => {
          if (response.status === 'ok') return (response.data);
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
