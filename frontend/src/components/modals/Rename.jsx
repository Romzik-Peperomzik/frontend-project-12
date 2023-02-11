import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  Button, Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as yup from 'yup';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';
import { channelsSelectors } from '../../slices/channelsSlice';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsName = channels.map(({ name }) => name);
  const currentModalItem = useSelector((state) => state.modal.item);
  const socketApi = useSocketApi();
  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const generateOnSubmit = (values, actions) => {
    actions.setSubmitting(true);
    const { id } = currentModalItem;
    const name = filter.clean(values.name);
    socketApi.renameChannel({ id, name }, (response) => {
      if (response.status === 'ok') {
        toast.success(t('feedback.channelRenamed'));
        handleCloseModal();
      } else toast.error(t('feedback.noNetwork'));
    });
    actions.setSubmitting(false);
  };

  const f = useFormik({
    initialValues: { name: currentModalItem.name },
    validationSchema: yup.object({
      name: yup.string().required(t('yup.required')).notOneOf(channelsName, t('yup.notOneOf')),
    }),
    onSubmit: generateOnSubmit,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>{t('modals.renameTitle')}</Modal.Title>
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
          {f.errors.name && <div className="text-danger mt-1">{t('feedback.invalidChannelName')}</div>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {t('modals.close')}
        </Button>
        <Button variant="primary" onClick={f.handleSubmit} disabled={f.isSubmitting}>
          {t('modals.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
