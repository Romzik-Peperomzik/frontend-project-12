import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import filter from 'leo-profanity';

import AuthProvider from './contexts/AuthProvider';
import App from './components/App';
import locales from './locales/index';
import ThemeProvider from './contexts/ThemeProvider';
import SocketApiProvider from './contexts/SocketApiProvider';
import store from './slices/index';

const defaultLanguage = 'ru';

const init = async (socket) => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      resources: { ru: { translation: locales.ru }, en: { translation: locales.en } },
      lng: defaultLanguage,
    });

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <AuthProvider>
          <ThemeProvider>
            <SocketApiProvider socket={socket}>
              <App />
            </SocketApiProvider>
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
