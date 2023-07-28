import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { channelsSelectors } from '../../../slices/channelsSlice';
import Channel from './Channel';

const ChannelNavigation = () => {
  const channels = useSelector(channelsSelectors.selectAll);

  return (
    <Nav className="px-2">
      {channels
        ? channels.map(({ id, name, removable }) => (
          <Channel
            key={id}
            id={id}
            name={name}
            removable={removable}
          />
        ))
        : null}
    </Nav>
  );
};

export default ChannelNavigation;
