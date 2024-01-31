import cn from 'classnames';
import React from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { showModal } from '../../../slices/modalSlice';
import { setCurrentChannelId } from '../../../slices/channelsSlice';
import useTheme from '../../../hooks/useTheme';

const Channel = ({ id, name, removable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const buttonVariant = (id === currentChannelId ? 'main' : 'secondary');
  const buttonClasses = cn({
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    'text-truncate': removable,
  });
  const { theme } = useTheme();

  const defaultButton = (
    <Button
      data-bs-theme={theme}
      data-bs-theme-variant={buttonVariant}
      className={buttonClasses}
      onClick={() => dispatch(setCurrentChannelId(id))}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  const dispatchNewModal = (type) => {
    dispatch(showModal({ type, item: { id, name } }));
  };

  const renderDropDownButton = () => (
    <Dropdown as={ButtonGroup} className="w-100">
      {defaultButton}
      <Dropdown.Toggle
        split
        data-bs-theme={theme}
        data-bs-theme-variant={buttonVariant}
        id="dropdown-split-basic"
      >
        <span className="visually-hidden">
          {t('controls.editChannel')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu data-bs-theme={theme}>
        <Dropdown.Item onClick={() => dispatchNewModal('removing')} data-bs-theme={theme}>
          {t('controls.dropDownChannelRemove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatchNewModal('renaming')} data-bs-theme={theme}>
          {t('controls.dropDownChannelRename')}
        </Dropdown.Item>
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
