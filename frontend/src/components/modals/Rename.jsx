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
  const inputRef = useRef();

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
        <Modal.Title>{t('modals.renameTitle')}</Modal.Title>
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

export default Rename;
