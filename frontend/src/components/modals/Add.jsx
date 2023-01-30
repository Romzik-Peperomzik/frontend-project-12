import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import useSocketApi from '../../hooks/useSocketApi';
import { hideModal } from '../../slices/modalSlice';
import { channelsSelectors, setRecentlyCreatedChannel } from '../../slices/channelsSlice';

const Add = () => {
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
      dispatch(setRecentlyCreatedChannel(values.name));
      socketApi.newChannel(values);
      handleCloseModal();
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
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              data-testid="input-name"
              name="name"
            />
          </FormGroup>
          {!isValidChannelName && <div className="text-danger mb-3">Канал с таким именем уже существует</div>}
          <input type="submit" className="btn btn-primary mt-2" value="submit" disabled={!isValidChannelName} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
