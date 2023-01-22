import React from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const pickButtonVariant = (id, currentChannelId) => (id === currentChannelId ? 'secondary' : 'light');

const renderDropDownButton = (id, name, buttonVariant) => (
  <Dropdown as={ButtonGroup} className="w-100">
    <Button variant={buttonVariant} className="w-100 rounded-0 text-start text-truncate">
      <span className="me-1">#</span>
      {name}
    </Button>
    <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic" />
    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const renderNonRemovableButton = (id, name, buttonVariant) => (
  <Button variant={buttonVariant} className="w-100 rounded-0 text-start">
    <span className="me-1">#</span>
    {name}
  </Button>
);

const Channel = (props) => {
  const { id, name, removable } = props;
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const buttonVariant = pickButtonVariant(id, currentChannelId);
  return (
    <Nav.Item className="w-100">
      {removable
        ? renderDropDownButton(id, name, buttonVariant)
        : renderNonRemovableButton(id, name, buttonVariant)}
    </Nav.Item>
  );
};

export default Channel;
