import cn from 'classnames';
import React from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentChannelId } from '../slices/channelsSlice';

const renderDropDownButton = (defaultButton, buttonVariant) => (
  <Dropdown as={ButtonGroup} className="w-100">
    {defaultButton}
    <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic" />
    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

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

  return (
    <Nav.Item className="w-100">
      {removable
        ? renderDropDownButton(defaultButton, buttonVariant)
        : defaultButton}
    </Nav.Item>
  );
};

export default Channel;
