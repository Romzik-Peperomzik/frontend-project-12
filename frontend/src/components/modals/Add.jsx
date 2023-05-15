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
import { channelsSelectors, setCurrentChannelId } from '../../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsName = channels.map(({ name }) => name);
  const socketApi = useSocketApi();
  const inputRef = useRef();
  const validationSchema = yup.object({
    name: yup.string()
      .notOneOf(channelsName, t('feedback.invalidChannelName'))
      .min(3, t('feedback.validationMin3Max20'))
      .max(20, t('feedback.validationMin3Max20'))
      .required(t('feedback.validationRequired')),
  });

  const handleCloseModal = () => dispatch(hideModal());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const generateOnSubmit = (values) => {
    const name = filter.clean(values.name);
    socketApi.newChannel({ name })
      .then((response) => {
        dispatch(setCurrentChannelId(response.data.id));
        handleCloseModal();
        toast.success(t('feedback.channelAdded'));
      })
      .catch((err) => {
        console.error(err);
        handleCloseModal();
        toast.error(t('feedback.noNetwork'));
      });
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: generateOnSubmit,
  });

  return (
    <Modal show centered onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="position-relative">
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
        <fieldset disabled={formik.isSubmitting}>
          <Button variant="secondary" onClick={handleCloseModal} className="me-2">
            {t('modals.close')}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t('modals.save')}
          </Button>
        </fieldset>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
