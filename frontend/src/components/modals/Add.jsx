import React, {
  useEffect, useState, useRef,
} from 'react';
import { useFormik } from 'formik';
import {
  Button, Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';
import { channelsSelectors } from '../../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const socketApi = useSocketApi();
  const [isValidChannelName, setInputChannelValidation] = useState(true);
  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const generateOnSubmit = (values) => {
    const index = channels.findIndex((channel) => channel.name === values.name);
    if (index > -1) {
      setInputChannelValidation(false);
    } else {
      setInputChannelValidation(true);
      socketApi.newChannel(values);
      handleCloseModal();
      toast.success(t('feedback.channelAdded'));
    }
  };

  const f = useFormik({
    onSubmit: generateOnSubmit,
    initialValues: { name: '' },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>{t('modals.addTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              id="name"
              name="name"
              placeholder={t('modals.inputPlaceholder')}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
            />
          </FormGroup>
          {!isValidChannelName && <div className="text-danger mt-1">{t('feedback.invalidChannelName')}</div>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {t('modals.close')}
        </Button>
        <Button variant="primary" onClick={f.handleSubmit}>
          {t('modals.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
