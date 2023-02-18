import React from 'react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import imgNotfound from '../assets/notfound.svg';
import routes from '../routes';

const Notfoundpage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image src={imgNotfound} alt="notfound" className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('feedback.pageNotfound')}</h1>
      <p className="text-muted">
        {t('feedback.pathNoticeText')}
        {' '}
        <a href={routes.chatPagePath()}>{t('feedback.pathNoticeLink')}</a>
      </p>
    </div>
  );
};

export default Notfoundpage;
