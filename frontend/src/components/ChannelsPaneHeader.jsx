import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { showModal } from '../slices/modalSlice';
import svgCross from '../assets/cross.svg';

const ChannelsPaneHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('panes.channelsHeader')}</span>
      <Button
        className="p-0 text-primary btn-group-vertical"
        variant="light"
        onClick={() => dispatch(showModal({ type: 'adding' }))}
      >
        <Image src={svgCross} alt="cross" />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default ChannelsPaneHeader;
