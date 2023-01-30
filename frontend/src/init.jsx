/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';

import App from './components/App';
import AuthContext from './contexts/authContext';
import SocketApiContext from './contexts/socketApiContext';
import store from './slices/index';

import { addChannel, setCurrentChannelId } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getUsername = () => {
    const user = JSON.parse(localStorage.getItem('userId'));
    return user.username;
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getUsername,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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

const init = (socket) => (
  <AuthProvider>
    <Provider store={store}>
      <SocketApiProvider socket={socket}>
        <App />
      </SocketApiProvider>
    </Provider>
  </AuthProvider>
);

export default init;
