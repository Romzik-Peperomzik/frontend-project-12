import React from 'react';
import { Button, Image, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { channelsSelectors } from '../slices/channelsSlice';
import Channel from './Channel';
import svgCross from '../assets/cross.svg';

const Header = () => (
  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
    <span>Каналы</span>
    <Button className="p-0 text-primary btn-group-vertical" variant="light">
      <Image src={svgCross} alt="cross" />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

const Navigation = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  return (
    <Nav className="px-2">
      {channels.map(({ id, name, removable }) => (
        <Channel
          key={id}
          id={id}
          name={name}
          removable={removable}
        />
      ))}
    </Nav>
  );
};

const ChannelsPane = ({ children }) => (children);

ChannelsPane.Header = Header;
ChannelsPane.Navigation = Navigation;

export default ChannelsPane;
