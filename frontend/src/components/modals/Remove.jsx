import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentChannelId } from '../../slices/channelsSlice';
import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';

const Remove = () => {
  const dispatch = useDispatch();
  const currentModalItem = useSelector((state) => state.modal.item);
  const socketApi = useSocketApi();
  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const { id } = currentModalItem;
    socketApi.removeChannel({ id });
    dispatch(setCurrentChannelId(1));
    handleCloseModal();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Form.Control plaintext readOnly defaultValue={`Канал для удаления: ${currentModalItem.name}`} />
          <div className="d-grid gap-2">
            <Button variant="danger" type="submit">Remove</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
