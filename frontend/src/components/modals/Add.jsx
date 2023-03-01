import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as yup from 'yup';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';
import { channelsSelectors, setCurrentChannelId } from '../../slices/channelsSlice';
import ModalWindow from './ModalWindow';

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
      .min(3, t('feedback.validationMin3'))
      .max(20, t('feedback.validationMax20'))
      .required(t('feedback.validationRequired')),
  });

  const handleCloseModal = () => dispatch(hideModal());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const generateOnSubmit = (values) => {
    const name = filter.clean(values.name);
    socketApi.newChannel(
      { name },
      (response) => {
        dispatch(setCurrentChannelId(response.data.id));
        handleCloseModal();
        toast.success(t('feedback.channelAdded'));
      },
      (err) => {
        console.error(err);
        handleCloseModal();
        toast.error(t('feedback.noNetwork'));
      },
    );
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: generateOnSubmit,
  });

  const texts = {
    titleText: t('modals.addTitle'),
    placeholderText: t('modals.inputPlaceholder'),
    closeButtonText: t('modals.close'),
    saveButtonText: t('modals.save'),
  };

  return (
    <ModalWindow
      formik={formik}
      handleCloseModal={handleCloseModal}
      inputRef={inputRef}
      texts={texts}
      type="add"
    />
  );
};

export default Add;
