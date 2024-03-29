import React from 'react';
import { useDispatch } from 'react-redux';

import SocketApiContext from './socketApiContext';
import store from '../slices/index';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';
import useAuth from '../hooks/useAuth';
import fetchData from '../slices/fetchThunk';

const socketApiHandler = (socket) => {
  const emitPromisify = (type, data) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit(type, data, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });

  const handlers = {
    newMessage: (data) => emitPromisify('newMessage', data),
    newChannel: (data) => emitPromisify('newChannel', data),
    renameChannel: (data) => emitPromisify('renameChannel', data),
    removeChannel: (data) => emitPromisify('removeChannel', data),
  };

  return handlers;
};

const SocketApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  const auth = useAuth();

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
    store.dispatch(removeChannel({ id }));
  });

  socket.on('connect_error', () => {
    setTimeout(() => dispatch(fetchData(auth.getAuthHeader())), 5000);
  });

  const socketApi = socketApiHandler(socket);

  return (
    <SocketApiContext.Provider value={socketApi}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketApiProvider;
