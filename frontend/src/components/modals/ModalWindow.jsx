import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalWindow = ({
  formik, handleCloseModal, inputRef, texts, handleClick, buttonRef, isDisable, type,
}) => {
  const {
    titleText,
    placeholderText,
    closeButtonText,
    saveButtonText,
    removeButtonText,
    removeReadOnlyText,
  } = texts;

  const getModalHeader = () => (
    <Modal.Header closeButton>
      <Modal.Title>{titleText}</Modal.Title>
    </Modal.Header>
  );

  const renderAddOrRenameModal = () => (
    <Modal show centered onHide={handleCloseModal}>
      {getModalHeader}
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="modalAddChannel" className="position-relative">
            <Form.Control
              id="name"
              name="name"
              placeholder={placeholderText}
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
              {placeholderText}
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <fieldset disabled={formik.isSubmitting}>
          <Button variant="secondary" onClick={handleCloseModal} className="me-2">
            {closeButtonText}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {saveButtonText}
          </Button>
        </fieldset>
      </Modal.Footer>
    </Modal>
  );

  const renderRemoveModal = () => (
    <Modal show centered onHide={handleCloseModal}>
      {getModalHeader}
      <Modal.Body>
        <p>
          {removeReadOnlyText}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal} disabled={isDisable}>
          {closeButtonText}
        </Button>
        <Button variant="danger" onClick={handleClick} ref={buttonRef} disabled={isDisable}>
          {removeButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  switch (type) {
    case 'add':
    case 'rename':
      return renderAddOrRenameModal();
    case 'remove':
      return renderRemoveModal();
    default:
      throw new Error('Unknown modal type');
  }
};

export default ModalWindow;
