import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentModalItem = useSelector((state) => state.modal.item);
  const socketApi = useSocketApi();
  const [isDisable, setDisable] = useState(false);
  const buttonRef = useRef();

  const handleCloseModal = () => dispatch(hideModal());

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  const handleClick = () => {
    setDisable(!isDisable);
    const { id } = currentModalItem;
    socketApi.removeChannel({ id }, (response) => {
      if (response.status === 'ok') {
        handleCloseModal();
        toast.success(t('feedback.channelRemoved'));
      } else toast.error(t('feedback.noNetwork'));
    });
    setDisable(!isDisable);
  };

  return (
    <Modal show centered onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {t('modals.removeReadOnlyText', { name: currentModalItem.name })}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal} disabled={isDisable}>
          {t('modals.close')}
        </Button>
        <Button variant="danger" onClick={handleClick} ref={buttonRef} disabled={isDisable}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
