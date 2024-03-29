import React from 'react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import imgNotfound from '../../assets/notfound.svg';
import routes from '../../routes';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image src={imgNotfound} alt="notfound" className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('feedback.pageNotfound')}</h1>
      <p className="text-muted">
        {t('feedback.pathNoticeText')}
        {' '}
        <Link to={routes.chatPagePath()}>{t('feedback.pathNoticeLink')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
