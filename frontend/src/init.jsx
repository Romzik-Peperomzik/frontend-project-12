/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';
import { Provider } from 'react-redux';

import App from './components/App';
import AuthContext from './contexts/authContext';
import socketApiContext from './contexts/socketApiContext';
import store from './slices/index';

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

const socketApiHandler = (socket) => {
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  const socketApi = {
    sendMessage(data) {
      socket.emit('newMessage', data, (response) => {
        if (response.status === 'ok') return (response.data);
        throw new Error(response.err);
      });
    },
  };

  return socketApi;
};

const init = (socket) => {
  const socketApi = socketApiHandler(socket);

  return (
    <AuthProvider>
      <socketApiContext.Provider value={socketApi}>
        <Provider store={store}>
          <App />
        </Provider>
      </socketApiContext.Provider>
    </AuthProvider>
  );
};

export default init;
