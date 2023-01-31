import React from 'react';
import { Provider } from 'react-redux';

import App from './components/App';
import AuthProvider from './hoc/AuthProvider';
import SocketApiProvider from './hoc/SocketApiProvider';
import store from './slices/index';

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
