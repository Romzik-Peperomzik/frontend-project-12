import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { setCurrentChannelId } from '../../slices/channelsSlice';
import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentModalItem = useSelector((state) => state.modal.item);
  const socketApi = useSocketApi();
  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id } = currentModalItem;
    socketApi.removeChannel({ id });
    dispatch(setCurrentChannelId(1));
    handleCloseModal();
    toast.success(t('feedback.channelRemoved'));
  };

  const buttonRef = useRef();
  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control plaintext readOnly defaultValue={t('modals.removeReadOnlyText', { name: currentModalItem.name })} />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {t('modals.close')}
        </Button>
        <Button variant="danger" onClick={handleSubmit} ref={buttonRef}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default Remove;
