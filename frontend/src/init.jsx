import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import AuthProvider from './contexts/AuthProvider';

import App from './components/App';
import translation from './locales/ru';
import SocketApiProvider from './contexts/SocketApiProvider';
import store from './slices/index';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const defaultLanguage = 'ru';

const init = async (socket) => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      resources: { ru: { translation } },
    });

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <AuthProvider>
              <SocketApiProvider socket={socket}>
                <App />
              </SocketApiProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
