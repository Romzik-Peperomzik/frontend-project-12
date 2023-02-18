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
import { channelsSelectors, setCurrentChannelId } from '../../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsName = channels.map(({ name }) => name);
  const socketApi = useSocketApi();
  const inputRef = useRef();

  const handleCloseModal = () => dispatch(hideModal());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const generateOnSubmit = (values) => {
    const name = filter.clean(values.name);
    socketApi.newChannel({ name }, (response) => {
      if (response.status === 'ok') {
        dispatch(setCurrentChannelId(response.data.id));
        handleCloseModal();
        toast.success(t('feedback.channelAdded'));
      } else toast.error(t('feedback.noNetwork'));
    });
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup.string()
        .notOneOf(channelsName, t(t('feedback.invalidChannelName')))
        .min(3, t('feedback.validationMin3'))
        .max(20, t('feedback.validationMax20'))
        .required(t('feedback.validationRequired')),
    }),
    onSubmit: generateOnSubmit,
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>{t('modals.addTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              id="name"
              name="name"
              placeholder={t('modals.inputPlaceholder')}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.inputPlaceholder')}
            </Form.Label>
          </FormGroup>

          {formik.errors.name
            && <div className="text-danger mt-1">{formik.errors.name}</div>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {t('modals.close')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
          {t('modals.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
