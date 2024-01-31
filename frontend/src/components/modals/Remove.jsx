import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';
import useTheme from '../../hooks/useTheme';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentModalItem = useSelector((state) => state.modal.item);
  const socketApi = useSocketApi();
  const [isDisable, setDisable] = useState(false);
  const buttonRef = useRef();
  const { theme } = useTheme();

  const handleCloseModal = () => dispatch(hideModal());

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  const handleClick = () => {
    setDisable(!isDisable);
    const { id } = currentModalItem;
    socketApi.removeChannel({ id })
      .then(() => {
        handleCloseModal();
        toast.success(t('feedback.channelRemoved'));
        setDisable(!!isDisable);
      })
      .catch((err) => {
        console.error(err);
        handleCloseModal();
        toast.error(t('feedback.noNetwork'));
        setDisable(!!isDisable);
      });
  };

  return (
    <Modal show centered onHide={handleCloseModal}>
      <Modal.Header closeButton data-bs-theme={theme}>
        <Modal.Title>{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body data-bs-theme={theme}>
        <p>
          {t('modals.removeReadOnlyText', { name: currentModalItem.name })}
        </p>
      </Modal.Body>

      <Modal.Footer data-bs-theme={theme}>
        <fieldset disabled={isDisable}>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="me-2"
            data-bs-theme={theme}
            data-bs-theme-variant="secondary"
          >
            {t('modals.close')}
          </Button>
          <Button
            onClick={handleClick}
            ref={buttonRef}
            data-bs-theme={theme}
            data-bs-theme-variant="danger"
          >
            {t('modals.remove')}
          </Button>
        </fieldset>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
