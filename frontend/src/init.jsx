import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';

import App from './components/App';
import AuthProvider from './hoc/AuthProvider';
import translation from './locales/ru';
import SocketApiProvider from './hoc/SocketApiProvider';
import store from './slices/index';

const init = async (socket) => {
  const defaultLanguage = 'ru';
  const i18nextInstance = i18next.createInstance();

  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      resources: {
        ru: {
          translation,
        },
      },
    });

  return (
    <AuthProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18nextInstance}>
          <SocketApiProvider socket={socket}>
            <App />
          </SocketApiProvider>
        </I18nextProvider>
      </Provider>
    </AuthProvider>
  );
};

export default init;
