import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';
import ModalWindow from './ModalWindow';

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

  const texts = {
    titleText: t('modals.removeTitle'),
    placeholderText: t('modals.inputPlaceholder'),
    closeButtonText: t('modals.close'),
    removeButtonText: t('modals.remove'),
    removeReadOnlyText: t('modals.removeReadOnlyText', { name: currentModalItem.name }),
  };

  return (
    <ModalWindow
      handleClick={handleClick}
      isDisable={isDisable}
      handleCloseModal={handleCloseModal}
      buttonRef={buttonRef}
      texts={texts}
      type="remove"
    />
  );
};

export default Remove;
