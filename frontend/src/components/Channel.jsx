import cn from 'classnames';
import React from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from '../slices/modalSlice';
import { setCurrentChannelId } from '../slices/channelsSlice';

const Channel = ({ id, name, removable }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const buttonVariant = (id === currentChannelId ? 'secondary' : 'light');
  const buttonClasses = cn({
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    'text-truncate': removable,
  });

  const defaultButton = (
    <Button
      variant={buttonVariant}
      className={buttonClasses}
      onClick={() => dispatch(setCurrentChannelId(id))}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  const showModalRename = () => {
    dispatch(showModal({ type: 'renaming', item: { id, name } }));
  };

  const showModalRemove = () => {
    dispatch(showModal({ type: 'removing', item: { id, name } }));
  };

  const renderDropDownButton = () => (
    <Dropdown as={ButtonGroup} className="w-100">
      {defaultButton}
      <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={showModalRemove}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={showModalRename}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Nav.Item className="w-100">
      {removable
        ? renderDropDownButton()
        : defaultButton}
    </Nav.Item>
  );
};

export default Channel;
