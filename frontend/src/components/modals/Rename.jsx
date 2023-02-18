import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
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
  const inputRef = useRef();
  const validationSchema = yup.object({
    name: yup.string()
      .notOneOf(channelsName, t('feedback.invalidChannelName'))
      .min(3, t('feedback.validationMin3'))
      .max(20, t('feedback.validationMax20'))
      .required(t('feedback.validationRequired')),
  });

  const handleCloseModal = () => dispatch(hideModal());

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const generateOnSubmit = (values) => {
    const { id } = currentModalItem;
    const name = filter.clean(values.name);
    socketApi.renameChannel({ id, name }, (response) => {
      if (response.status === 'ok') {
        toast.success(t('feedback.channelRenamed'));
        handleCloseModal();
      } else toast.error(t('feedback.noNetwork'));
    });
  };

  const formik = useFormik({
    initialValues: { name: currentModalItem.name },
    validationSchema,
    onSubmit: generateOnSubmit,
  });

  return (
    <Modal show centered onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="modalRenameChannel" className="position-relative">
            <Form.Control
              id="name"
              name="name"
              placeholder={t('modals.inputPlaceholder')}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!formik.isValid}
              ref={inputRef}
              disabled={formik.isSubmitting}
            />
            {formik.errors.name
              && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.name}
              </Form.Control.Feedback>
              )}

            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.inputPlaceholder')}
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal} disabled={formik.isSubmitting}>
          {t('modals.close')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
          {t('modals.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
